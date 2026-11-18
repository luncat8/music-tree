// owns: boot and wiring only
// edit for: load order, boot, wiring

const $ = id => document.getElementById(id);

renderTree();
selectGenre(GENRES[0].id);