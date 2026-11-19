# Atlas implementation notes

- A cross-origin font preload can fail on `file://` in Chromium even when the same local face loads through CSS. Use local `@font-face` URLs and test a real file navigation with normal browser security, not just an HTTP server.
- Keep canvas connections and native node buttons in one transformed plane. Pan and zoom then move pixels and keyboard targets together without redrawing or running an idle frame loop.
- `AudioContext.resume()` is asynchronous. Invalidate pending playback on stop, genre change or view change so an old study cannot start after its file has closed.
- Anchor `AudioParam` with `setValueAtTime(param.value, currentTime)` before `linearRampToValueAtTime` when the parameter was initialized via `.value`, so stop fades smoothly instead of stepping.
- Keep offline runtime assets distinct from optional outbound reference links: start dynamic external anchors `hidden` without a placeholder `href` so static markup issues zero network requests and asset audits stay exact.
- A generated heading row must be owned by the file that measures the graph. Static generation markup drifts from the data as soon as a new depth appears; build the row from a catalog label array in the layout owner.
- Derive column fractions from the measured maximum depth and size nodes from the column gap; a fixed column table clips the deepest generation on narrow viewports.
- Check real card and text bounds at phone widths and short desktop heights. A DOM mock can show valid positions while rendered card heights and font ranges still collide.
- Keep viewport bounds separate from the width of a panning chart. `overflow: clip` prevents native focus scrolling from adding a second offset to the camera transform.
- Chromium can retarget a touch on blank canvas to a nearby card. Keep capture on the original pointer target for taps, then transfer capture to the stage after a movement threshold. Ignore the old target’s `lostpointercapture` during that transfer.
- Sized map cards need a text rule that cannot change the box. A label with `white-space: normal` wraps when the column narrows and the extra line grows the card into the row below. Keep the name `nowrap` and have the layout owner scale it to the measured text column after the card width is set: `measure → card width → label fit → card height`.
- Derive stroke and reveal geometry from the card box, not from rendered text. Reading `offsetHeight` after a wrapped label once fed the taller box back into cable maths; a fixed slot height makes cards align even if a label ever escapes its rule.
