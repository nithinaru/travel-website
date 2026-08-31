# Travel blog

A travel blog laid out like [mikematas.com](https://mikematas.com). Static HTML,
CSS and vanilla JS — no build step, no dependencies.

## Run it

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## How it works

Three levels:

- **Timeline** — every trip on one horizontal line, newest at the left, older
  and smaller to the right. Drag, scroll, swipe or ← / → to move through time.
- **Trip** — click a photo and it zooms out of the line. Left and right slide to
  the next trip.
- **Article** — click the photo again (or scroll down) and it travels to the top
  of the page and grows into the article's lead image. Scroll back up to leave.

The chevron at the top left goes back a level. Esc does the same.

## Adding a trip

Everything lives in `js/data.js`. Add an entry to `window.TRIPS`, newest first:

```js
{
  id: 'porto',
  title: 'Porto',
  place: 'Portugal',
  blurb: 'A long weekend',
  date: 'May 2026',
  year: 2026,                  // header year, and the spacing on the line
  image: 'images/porto.jpg',
  width: 2000, height: 1333,   // the image's real pixel size
  scale: 1,                    // 0–1: how tall it stands on the line
  with: ['Sarah'],
  body: [
    { p: 'A paragraph.' },
    { h: 'A subheading' },
    { quote: 'A pull quote.' },
    { img: 'images/porto-2.jpg', caption: 'Optional caption' }
  ]
}
```

`width` and `height` must match the file — the zoom between levels only lines up
if the aspect ratio is right. `scale` is how tall the photo stands on the line;
vary it to give the line some rhythm. It has nothing to do with how old the trip
is.

Your name and the nav links are at the top of the same file.

## Images

`images/` holds generated placeholders. Replace them with your photos and delete
`tools/generate-placeholders.py`.
