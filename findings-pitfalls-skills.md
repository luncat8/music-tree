# Atlas implementation notes

- A cross-origin font preload can fail on `file://` in Chromium even when the same local face loads through CSS. Use local `@font-face` URLs and test a real file navigation with normal browser security, not just an HTTP server.
- Keep canvas connections and native node buttons in one transformed plane. Pan and zoom then move pixels and keyboard targets together without redrawing or running an idle frame loop.
- `AudioContext.resume()` is asynchronous. Invalidate pending playback on stop, genre change or view change so an old study cannot start after its file has closed.
- Anchor `AudioParam` with `setValueAtTime(param.value, currentTime)` before `linearRampToValueAtTime` when the parameter was initialized via `.value`, so stop fades smoothly instead of stepping.
- Keep offline runtime assets distinct from optional outbound reference links: start dynamic external anchors `hidden` without a placeholder `href` so static markup issues zero network requests and asset audits stay exact.
- A generated heading row must be owned by the file that measures the graph. Static generation markup drifts from the data as soon as a new depth appears; build the row from a catalog label array in the layout owner.
- Derive column fractions from the measured maximum depth and size nodes from the column gap; a fixed column table clips the deepest generation on narrow viewports.
