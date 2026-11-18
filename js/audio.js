// owns: pattern playback with WebAudio
// edit for: synth timbre, tempo, note parsing

const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
let actx = null;

function freq(name) {
	const acc = name[1] === '#' || name[1] === 'b';
	let semi = SEMI[name[0]];
	if (name[1] === '#') semi += 1;
	else if (name[1] === 'b') semi -= 1;
	const octave = +name[acc ? 2 : 1];
	const midi = (octave + 1) * 12 + semi;
	return 440 * Math.pow(2, (midi - 69) / 12);
}

function playPattern(pattern) {
	if (!pattern || !pattern.length) return;
	actx = actx || new (window.AudioContext || window.webkitAudioContext)();
	if (actx.state === 'suspended') actx.resume();
	const beat = 60 / 120;
	let t = actx.currentTime + 0.05;
	for (let i = 0; i < pattern.length; i++) {
		voice(actx, freq(pattern[i][0]), t, pattern[i][1] * beat);
		t += pattern[i][1] * beat;
	}
}

function voice(ctx, f, t, dur) {
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = 'triangle';
	osc.frequency.value = f;
	gain.gain.setValueAtTime(0, t);
	gain.gain.linearRampToValueAtTime(0.22, t + 0.02);
	gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
	osc.connect(gain);
	gain.connect(ctx.destination);
	osc.start(t);
	osc.stop(t + dur + 0.03);
}

if (typeof module !== 'undefined') module.exports = { freq, playPattern };