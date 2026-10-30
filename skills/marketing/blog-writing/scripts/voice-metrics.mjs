#!/usr/bin/env node
// Measure the observable traits of blog prose in Markdown or plain-text files.
// Usage: node voice-metrics.mjs <file-or-dir>... [--json] [--per-file] [--profile VOICE.md]
// The profile is a JSON file, or a Markdown file containing a ```json voice-profile block.
// With --profile, values outside the profile's ranges and flagged terms are reported
// and the process exits with code 1.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const TEXT_EXTENSIONS = new Set(['.md', '.mdx', '.markdown', '.txt']);

const HEDGES = [
  'might',
  'may',
  'perhaps',
  'maybe',
  'possibly',
  'probably',
  'seems',
  'seem',
  'seemed',
  'arguably',
  'somewhat',
  'likely',
  'i think',
  'i guess',
  'i suspect',
  'sort of',
  'kind of',
  'in my opinion',
];
const INTENSIFIERS = [
  'very',
  'really',
  'extremely',
  'incredibly',
  'truly',
  'absolutely',
  'totally',
  'super',
  'literally',
  'definitely',
  'highly',
  'deeply',
];
const FIRST_SINGULAR = new Set([
  'i',
  'me',
  'my',
  'mine',
  'myself',
  "i'm",
  "i've",
  "i'd",
  "i'll",
]);
const FIRST_PLURAL = new Set([
  'we',
  'us',
  'our',
  'ours',
  'ourselves',
  "we're",
  "we've",
  "we'd",
  "we'll",
]);
const SECOND_PERSON = new Set([
  'you',
  'your',
  'yours',
  'yourself',
  "you're",
  "you've",
  "you'd",
  "you'll",
]);
const ABBREVIATIONS = [
  'e.g.',
  'i.e.',
  'etc.',
  'vs.',
  'mr.',
  'mrs.',
  'ms.',
  'dr.',
  'u.s.',
  'a.m.',
  'p.m.',
];

const args = process.argv.slice(2);
const flags = new Set(
  args.filter((arg) => arg.startsWith('--') && arg !== '--profile'),
);
const profileIndex = args.indexOf('--profile');
const profilePath = profileIndex === -1 ? undefined : args[profileIndex + 1];
const inputs = args.filter(
  (arg, index) =>
    !arg.startsWith('--') &&
    (profileIndex === -1 || index !== profileIndex + 1),
);

if (inputs.length === 0 || (profileIndex !== -1 && !profilePath)) {
  console.error(
    'Usage: node voice-metrics.mjs <file-or-dir>... [--json] [--per-file] [--profile VOICE.md]',
  );
  process.exit(2);
}

function collectFiles(path) {
  let stats;
  try {
    stats = statSync(path);
  } catch {
    console.error(`Cannot read ${path}.`);
    process.exit(2);
  }
  if (stats.isDirectory()) {
    return readdirSync(path)
      .toSorted()
      .flatMap((entry) => collectFiles(join(path, entry)));
  }
  return TEXT_EXTENSIONS.has(extname(path).toLowerCase()) ? [path] : [];
}

function countPhrase(text, phrase) {
  const pattern = new RegExp(`\\b${phrase.replaceAll(' ', '\\s+')}\\b`, 'g');
  return text.match(pattern)?.length ?? 0;
}

function syllables(word) {
  const groups = word
    .toLowerCase()
    .replace(/e$/, '')
    .match(/[aeiouy]+/g);
  return Math.max(1, groups?.length ?? 0);
}

function splitSentences(paragraph) {
  let protectedText = paragraph;
  for (const abbreviation of ABBREVIATIONS) {
    const pattern = new RegExp(abbreviation.replaceAll('.', '\\.'), 'gi');
    protectedText = protectedText.replace(pattern, (match) =>
      match.replaceAll('.', '․'),
    );
  }
  return protectedText
    .split(/(?<=[.!?])["')\]]*\s+(?=["'([]?[A-Z0-9])/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => /[A-Za-z]/.test(sentence));
}

function words(text) {
  return text.match(/[A-Za-z0-9]+(?:'[A-Za-z]+)?/g) ?? [];
}

// Convert Markdown into prose paragraphs, list items, and structural counts.
// Code, tables, block quotes, and front matter are counted but excluded from prose.
function parse(source) {
  const counts = {
    headings: 0,
    listItems: 0,
    codeBlocks: 0,
    tables: 0,
    quotes: 0,
    links: 0,
    bold: 0,
  };
  const lines = source
    .replace(/\r\n?/g, '\n')
    .replaceAll('’', "'")
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .split('\n');
  const paragraphs = [];
  const listItems = [];
  let buffer = [];
  let fence;
  let inTable = false;

  const flush = () => {
    if (buffer.length > 0) paragraphs.push(buffer.join(' '));
    buffer = [];
  };

  for (const line of lines) {
    const fenceMatch = line.match(/^\s*(```|~~~)/);
    if (fence) {
      if (fenceMatch?.[1] === fence) fence = undefined;
      continue;
    }
    if (fenceMatch) {
      flush();
      fence = fenceMatch[1];
      counts.codeBlocks += 1;
      continue;
    }
    const isTableLine = /^\s*\|/.test(line);
    if (isTableLine && !inTable) counts.tables += 1;
    inTable = isTableLine;
    if (isTableLine || /^\s*(import|export)\s/.test(line)) {
      flush();
      continue;
    }
    if (/^\s*$/.test(line)) {
      flush();
    } else if (/^#{1,6}\s/.test(line)) {
      flush();
      counts.headings += 1;
    } else if (/^\s*>/.test(line)) {
      flush();
      counts.quotes += 1;
    } else if (/^\s*([-*+]|\d+[.)])\s+/.test(line)) {
      flush();
      counts.listItems += 1;
      listItems.push(line.replace(/^\s*([-*+]|\d+[.)])\s+/, ''));
    } else {
      buffer.push(line.trim());
    }
  }
  flush();

  const clean = (text) => {
    counts.links += text.match(/(?<!!)\[[^\]]*\]\([^)]*\)/g)?.length ?? 0;
    counts.bold += text.match(/\*\*[^*]+\*\*|__[^_]+__/g)?.length ?? 0;
    return text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/`[^`]*`/g, 'code')
      .replace(/<[^>]+>/g, '')
      .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
      .trim();
  };

  return {
    counts,
    paragraphs: paragraphs
      .map(clean)
      .filter((paragraph) => paragraph.length > 0),
    listItems: listItems.map(clean),
  };
}

function percentile(sorted, fraction) {
  if (sorted.length === 0) return 0;
  return sorted[
    Math.min(sorted.length - 1, Math.floor(fraction * sorted.length))
  ];
}

function round(value) {
  return Math.round(value * 10) / 10;
}

function measure(sources) {
  const totals = {
    headings: 0,
    listItems: 0,
    codeBlocks: 0,
    tables: 0,
    quotes: 0,
    links: 0,
    bold: 0,
  };
  const sentenceLengths = [];
  const paragraphSizes = [];
  const allText = [];
  let syllableCount = 0;
  let proseWordCount = 0;

  for (const source of sources) {
    const parsed = parse(source);
    for (const [key, value] of Object.entries(parsed.counts))
      totals[key] += value;
    for (const paragraph of parsed.paragraphs) {
      const sentences = splitSentences(paragraph);
      paragraphSizes.push(sentences.length);
      for (const sentence of sentences) {
        const sentenceWords = words(sentence);
        sentenceLengths.push(sentenceWords.length);
        proseWordCount += sentenceWords.length;
        syllableCount += sentenceWords.reduce(
          (sum, word) => sum + syllables(word),
          0,
        );
      }
    }
    allText.push(...parsed.paragraphs, ...parsed.listItems);
  }

  const text = allText.join('\n');
  const lower = text.toLowerCase();
  const tokens = words(lower);
  const wordCount = tokens.length;
  const perThousand = (count) =>
    wordCount === 0 ? 0 : round((count / wordCount) * 1000);
  const sorted = sentenceLengths.toSorted((a, b) => a - b);
  const sentenceCount = sentenceLengths.length;
  const mean = sentenceCount === 0 ? 0 : proseWordCount / sentenceCount;
  const variance =
    sentenceCount === 0
      ? 0
      : sentenceLengths.reduce((sum, length) => sum + (length - mean) ** 2, 0) /
        sentenceCount;
  const share = (predicate) =>
    sentenceCount === 0
      ? 0
      : round((sentenceLengths.filter(predicate).length / sentenceCount) * 100);
  const contractions =
    lower.match(
      /\b\w+n't\b|\b\w+'(re|ve|ll|m|d)\b|\b(it|that|there|here|what|who|he|she|let)'s\b/g,
    )?.length ?? 0;

  return {
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphSizes.length,
    sentence_words_mean: round(mean),
    sentence_words_median: percentile(sorted, 0.5),
    sentence_words_p90: percentile(sorted, 0.9),
    sentence_words_sd: round(Math.sqrt(variance)),
    short_sentence_pct: share((length) => length <= 8),
    long_sentence_pct: share((length) => length >= 30),
    paragraph_sentences_mean:
      paragraphSizes.length === 0
        ? 0
        : round(
            paragraphSizes.reduce((sum, size) => sum + size, 0) /
              paragraphSizes.length,
          ),
    one_sentence_paragraph_pct:
      paragraphSizes.length === 0
        ? 0
        : round(
            (paragraphSizes.filter((size) => size === 1).length /
              paragraphSizes.length) *
              100,
          ),
    flesch_kincaid_grade:
      sentenceCount === 0 || proseWordCount === 0
        ? 0
        : round(0.39 * mean + 11.8 * (syllableCount / proseWordCount) - 15.59),
    contractions_per_1k: perThousand(contractions),
    first_singular_per_1k: perThousand(
      tokens.filter((token) => FIRST_SINGULAR.has(token)).length,
    ),
    first_plural_per_1k: perThousand(
      tokens.filter((token) => FIRST_PLURAL.has(token)).length,
    ),
    second_person_per_1k: perThousand(
      tokens.filter((token) => SECOND_PERSON.has(token)).length,
    ),
    questions_per_1k: perThousand(
      text.match(/\?(?=["')\]]*(\s|$))/g)?.length ?? 0,
    ),
    exclamations_per_1k: perThousand(
      text.match(/!(?=["')\]]*(\s|$))/g)?.length ?? 0,
    ),
    em_dashes_per_1k: perThousand(text.match(/—|\s--\s|\s–\s/g)?.length ?? 0),
    semicolons_per_1k: perThousand(text.match(/;/g)?.length ?? 0),
    parentheticals_per_1k: perThousand(text.match(/\([^)]*\)/g)?.length ?? 0),
    hedges_per_1k: perThousand(
      HEDGES.reduce((sum, hedge) => sum + countPhrase(lower, hedge), 0),
    ),
    intensifiers_per_1k: perThousand(
      INTENSIFIERS.reduce((sum, word) => sum + countPhrase(lower, word), 0),
    ),
    headings_per_1k: perThousand(totals.headings),
    list_items_per_1k: perThousand(totals.listItems),
    code_blocks_per_1k: perThousand(totals.codeBlocks),
    tables_per_1k: perThousand(totals.tables),
    links_per_1k: perThousand(totals.links),
    bold_per_1k: perThousand(totals.bold),
  };
}

function findFlaggedTerms(file, source, terms) {
  const hits = [];
  source.split('\n').forEach((line, index) => {
    for (const term of terms) {
      const normalize = (text) => text.toLowerCase().replaceAll('\u2019', "'");
      if (countPhrase(normalize(line), normalize(term)) > 0) {
        hits.push(`${file}:${index + 1}: ${term}`);
      }
    }
  });
  return hits;
}

const files = inputs.flatMap(collectFiles);
if (files.length === 0) {
  console.error('No .md, .mdx, .markdown, or .txt files found.');
  process.exit(2);
}
const sources = files.map((file) => readFileSync(file, 'utf8'));
function loadProfile(path) {
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    console.error(`Cannot read ${path}.`);
    process.exit(2);
  }
  if (extname(path).toLowerCase() === '.json') return JSON.parse(text);
  const block = text.match(/^```json voice-profile\n([\s\S]*?)^```/m);
  if (!block) {
    console.error(`No \`\`\`json voice-profile block found in ${path}.`);
    process.exit(2);
  }
  return JSON.parse(block[1]);
}

const profile = profilePath ? loadProfile(profilePath) : undefined;
const aggregate = measure(sources);
const perFile = flags.has('--per-file')
  ? Object.fromEntries(
      files.map((file, index) => [file, measure([sources[index]])]),
    )
  : undefined;

const outOfRange = [];
for (const [metric, [min, max]] of Object.entries(profile?.ranges ?? {})) {
  const value = aggregate[metric];
  if (value === undefined) {
    outOfRange.push(`${metric}: unknown metric in profile`);
  } else if (value < min || value > max) {
    outOfRange.push(`${metric}: ${value} (target ${min} to ${max})`);
  }
}
const flaggedTerms = files.flatMap((file, index) =>
  findFlaggedTerms(file, sources[index], profile?.flagged_terms ?? []),
);

if (flags.has('--json')) {
  console.log(
    JSON.stringify(
      { files, aggregate, perFile, outOfRange, flaggedTerms },
      null,
      2,
    ),
  );
} else {
  console.log(`Files: ${files.length}`);
  for (const [metric, value] of Object.entries(aggregate)) {
    const range = profile?.ranges?.[metric];
    console.log(
      `${metric.padEnd(28)} ${String(value).padStart(7)}${range ? `  target ${range[0]} to ${range[1]}` : ''}`,
    );
  }
  for (const [file, metrics] of Object.entries(perFile ?? {})) {
    console.log(`\n${file}`);
    for (const [metric, value] of Object.entries(metrics)) {
      console.log(`  ${metric.padEnd(26)} ${String(value).padStart(7)}`);
    }
  }
  if (profile) {
    console.log(
      outOfRange.length === 0
        ? '\nAll profiled metrics are in range.'
        : '\nOut of range:',
    );
    for (const line of outOfRange) console.log(`  ${line}`);
    if (flaggedTerms.length > 0) console.log('\nFlagged terms:');
    for (const line of flaggedTerms) console.log(`  ${line}`);
  }
}

if (profile && (outOfRange.length > 0 || flaggedTerms.length > 0))
  process.exit(1);
