// owns: inline sprite references and family color marks
// edit for: shared icon and swatch markup
function atlasIcon(name) {
	return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
}

function atlasDot(color) {
	return `<i class="color-dot" style="--tone:${color}" aria-hidden="true"></i>`;
}

if (typeof module !== 'undefined' && module.exports) module.exports = { atlasIcon, atlasDot };
