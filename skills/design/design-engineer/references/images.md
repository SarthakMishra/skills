# Images

Use this reference for components that show photos, icons, screenshots, or
user-uploaded images.

## Use good images or none

Weak photography undermines an otherwise good design. Use professional or
high-quality stock photos, or design without photos. Never design around a
placeholder you plan to replace with a phone snapshot later.

## Make text over images readable

Photos have light and dark areas, so any one text color gets lost somewhere. Even
out the image behind the text instead of changing the text:

| Technique            | How                                                                                            | Trade-off                                       |
| -------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Overlay              | A semi-transparent black layer under light text, or white under dark text (`bg-black/50`).     | Darkens or lightens the whole image.            |
| Lower image contrast | Reduce the image's contrast and adjust brightness to compensate (`contrast-75 brightness-90`). | Changes the image's character less.             |
| Colorize             | Lower contrast, desaturate, then multiply a brand color over it (`mix-blend-multiply`).        | Ties the image to the palette; loses its color. |
| Text glow            | A large-blur text shadow with no offset, combined with a smaller contrast reduction.           | Keeps more of the image's dynamics.             |

Measure contrast against the lightest area actually behind the text, not an
average.

## Respect intended sizes

Icons and images look best near the size they were drawn for.

- **Icons scaled up** (a 24px icon at 64px) look chunky and crude. To fill a large
  space, keep the icon near its size inside a tinted shape:

  ```tsx
  <div className="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
    <ShieldIcon className="text-primary size-6" />
  </div>
  ```

- **Icons scaled down** (a detailed logo as a 16px favicon) turn to mush. Use a
  simplified version drawn for the small size.
- **Screenshots scaled down** turn 16px text into unreadable 4px text. Take the
  screenshot at a smaller viewport, crop to the relevant part, or draw a
  simplified version with lines in place of small text.

## Contain user-uploaded images

You cannot control the crop, color, or aspect ratio of uploaded images, so control
the frame:

- **Shape and size:** show images in fixed frames and crop to fill
  (`aspect-square w-16 rounded-md object-cover`), so a tall photo cannot break a
  grid of avatars or cards.
- **Background bleed:** an image with a background close to the page's loses its
  edge. A border usually clashes with the image's colors; use a subtle inner
  shadow or a semi-transparent inner ring instead (`ring-1 ring-inset
  ring-black/10`, with a light equivalent in dark mode).
