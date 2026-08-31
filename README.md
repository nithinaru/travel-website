# Travel blog

A recreation of the layout of [mikematas.com](https://mikematas.com) for a travel
blog. Static HTML, CSS and vanilla JS — no build step, no dependencies.

## Running it

Any static server will do:

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173. Opening `index.html` from the filesystem works too.

## How it moves

Three levels, the same as the reference site:

| level | what it is | how you get in | how you get out |
| --- | --- | --- | --- |
| timeline | every trip on one horizontal line, newest at the left, older and smaller to the right | — | — |
| trip | one trip opened up: title, place, dates, who came, the photo | **click a trip** (or ↓ / Enter) | the back chevron, Esc, ↑, swipe up |
| post | the blog post, scrolling vertically | click the photo or the ⌄ button, scroll down, swipe down, ↓ | the chevron, Esc, or scroll back up past the top |

Sideways moves through time: drag, scroll, swipe, or ← / →. On the timeline the
header year tracks whichever trip is under the focus line; inside a trip, left
and right slide the whole track to the next one.

A few deliberate rules:

- **The timeline opens on a click and nothing else.** Scrolling there only ever
  moves the line sideways, so the trip that opens is always the one you clicked.
- **Opening a trip clears the header.** The name, the year and the nav go, and a
  back chevron takes their place; the photo grows out of the line to the right,
  and only once it has settled does the text arrive on the left. Going back runs
  the same thing in reverse — the photo shrinks into its slot on the line.
- **Paging sideways inside a trip is a pure slide.** Nothing fades; the whole
  track moves and the next trip arrives already lit.
- **Opening the post carries the photo with it** — it travels to the top middle
  of the page and grows into the article's lead image. Scrolling back up sends it
  home again.

Every photo that moves between levels is carried by one throwaway element (`fly`
in [`js/app.js`](js/app.js)), so the source and destination are never both on
screen and a transition cannot be left half-finished.

## Adding a trip

Everything lives in [`js/data.js`](js/data.js). Add an entry to `window.TRIPS`,
keeping the array **newest first**:

```js
{
  id: 'porto',
  title: 'Porto',              // big name
  place: 'Portugal',           // first subtitle line
  blurb: 'A long weekend',     // second subtitle line, also the post standfirst
  date: 'May 2026',
  year: 2026,                  // drives the header year and the timeline spacing
  image: 'images/porto.jpg',
  width: 2000, height: 1333,   // the image's real pixel size, for its aspect ratio
  scale: 1,                    // 0–1: how tall it stands on the timeline
  with: ['Sarah'],
  body: [
    { p: 'A paragraph.' },
    { h: 'A subheading' },
    { quote: 'A pull quote.' },
    { img: 'images/porto-2.jpg', caption: 'Optional caption' }
  ]
}
```

Two things to keep in mind:

- **`width` / `height` must match the file.** The timeline and the trip view both
  size the photo from that ratio, and the zoom between them only lines up if it
  is right.
- **`scale` is the timeline's sense of perspective.** Recent trips are near 1,
  older ones taper towards 0.2, which is what makes the line recede into the past.
  Nudge it per trip until the row looks right.

Your name and the nav links are at the top of the same file, in `window.SITE`.

## Images

`images/` currently holds generated placeholders so the layout has something to
show. Replace them with your own photos and delete
[`tools/generate-placeholders.py`](tools/generate-placeholders.py) — it only
exists to make those stand-ins.

## Notes on the recreation

- Type is [Inter](https://rsms.me/inter/); the reference uses Lab Grotesque, which
  is licensed. Swap the `@font-face`/Google Fonts link in `index.html` if you
  license something closer.
- The whole composition is sized in `em` off a root font size that tracks the
  viewport height (`--fs`), so it scales as one piece — same trick as the original.
- The reference replaces the pointer with a soft inverted circle. This uses the
  normal system cursor instead.
