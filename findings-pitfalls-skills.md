# Atlas implementation notes

- A cross-origin font preload can fail on `file://` in Chromium even when the same local face loads through CSS. Use local `@font-face` URLs and test a real file navigation with normal browser security, not just an HTTP server.
- Keep canvas connections and native node buttons in one transformed plane. Pan and zoom then move pixels and keyboard targets together without redrawing or running an idle frame loop.
- `AudioContext.resume()` is asynchronous. Invalidate pending playback on stop, genre change or view change so an old study cannot start after its file has closed.
