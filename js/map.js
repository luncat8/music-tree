// owns: lineage layout, connection rendering, branch controls and camera
// edit for: node interaction, graph geometry, filtering and zoom
const lineageMap = {
	branch: 'all', current: null, nodes: [], byId: new Map(), scale: 1, dx: 0, dy: 0, pointer: null,
	init(catalog, choose) {
		this.catalog = catalog;
		this.choose = choose;
		this.stage = $('plot-stage');
		this.space = $('plot-space');
		this.canvas = $('canv');
		this.ctx = this.canvas.getContext('2d');
		this.layer = $('plot-nodes');
		this.guides = $('plot-guides').children;
		this.picker = $('branch-pick');
		this.readout = $('zoom-readout');
		this.makeNodes();
		this.makeKey();
		this.picker.addEventListener('change', () => this.filter(this.picker.value));
		this.wireCamera();
		this.resize = new ResizeObserver(() => this.layout());
		this.resize.observe(this.stage);
		this.layout();
	},
	makeNodes() {
		for (const genre of this.catalog.genres) {
			const node = { genre, children: [], button: document.createElement('button'), x: 0, y: 0, width: 0, unit: 0, visible: true };
			this.nodes.push(node);
			this.byId.set(genre.id, node);
		}
		for (const node of this.nodes) {
			node.parent = this.byId.get(node.genre.parent);
			if (node.parent) node.parent.children.push(node);
			else this.origin = node;
		}
		this.decorateNode(this.origin, 0);
	},
	decorateNode(node, depth) {
		const { genre, button, children } = node;
		const family = this.catalog.families[genre.family];
		node.depth = depth;
		button.type = 'button';
		button.className = children.length ? 'genre-node' : 'genre-node is-tip';
		button.dataset.level = depth;
		button.dataset.genre = genre.id;
		button.setAttribute('aria-label', `${genre.name}, ${genre.date}. Open genre profile`);
		button.setAttribute('aria-pressed', 'false');
		button.style.setProperty('--tone', family.color);
		const mark = children.length ? `<span class="node-glyph">${atlasIcon(family.glyph)}</span>` : '<i class="tip-point"></i>';
		button.innerHTML = `${mark}<span class="node-type"><span class="node-name">${genre.short || genre.name}</span><span class="node-date">${genre.date}</span></span>`;
		button.addEventListener('click', () => this.choose(genre.id, true));
		this.layer.append(button);
		for (const child of children) this.decorateNode(child, depth + 1);
	},
	makeKey() {
		const items = $('key-items');
		for (const [id, family] of Object.entries(this.catalog.families)) {
			const item = document.createElement('span');
			item.className = 'key-item';
			item.dataset.family = id;
			item.innerHTML = `${atlasDot(family.color)}${family.label}`;
			items.append(item);
			if (id !== this.origin.genre.family) this.picker.add(new Option(family.label, id));
		}
		this.keyItems = items.children;
	},
	filter(id) {
		this.branch = id;
		this.picker.value = id;
		this.layout();
		this.fit();
		if (id !== 'all') this.choose(id, false);
	},
	select(genre) {
		if (this.branch !== 'all' && genre.parent && genre.family !== this.branch) this.filter('all');
		this.current = this.byId.get(genre.id);
		for (const node of this.nodes) {
			const picked = node === this.current;
			node.button.classList.toggle('is-picked', picked);
			node.button.setAttribute('aria-pressed', String(picked));
		}
		this.draw();
	},
	measure(node, first) {
		if (!node.visible) return 0;
		let span = 0;
		for (const child of node.children) span += this.measure(child, first + span);
		span = Math.max(1, span);
		node.unit = first + span / 2;
		return span;
	},
	layout() {
		const width = this.stage.clientWidth;
		const height = this.stage.clientHeight;
		if (!width || !height) return;
		const changed = width !== this.width || height !== this.height;
		this.width = width;
		this.height = height;
		const compact = width < 540;
		this.stage.classList.toggle('is-compact', compact);
		this.columns = compact ? [.15, .48, .822] : [.145, .485, .843];
		let count = 0;
		for (const node of this.nodes) {
			node.visible = this.branch === 'all' || node === this.origin || node.genre.family === this.branch;
			node.button.hidden = !node.visible;
			if (node.visible) count++;
		}
		const slots = this.measure(this.origin, 0);
		const inset = compact ? 39 : 45;
		const step = (height - inset - 54) / slots;
		for (const node of this.nodes) {
			if (!node.visible) continue;
			node.x = width * this.columns[node.depth];
			node.y = inset + node.unit * step;
			const preferred = node.depth === 2 ? 147 : 155;
			node.width = compact ? Math.min(113, width * (node.depth === 2 ? .275 : .225)) : Math.min(preferred, width * .205);
			node.button.style.left = `${node.x}px`;
			node.button.style.top = `${node.y}px`;
			node.button.style.width = `${node.width}px`;
		}
		for (let i = 0; i < this.guides.length; i++) this.guides[i].style.left = `${this.columns[i] * 100}%`;
		for (const item of this.keyItems) item.classList.toggle('is-muted', this.branch !== 'all' && item.dataset.family !== this.branch && item.dataset.family !== this.origin.genre.family);
		$('node-count').textContent = `${count} nodes`;
		// Oversampling keeps thin cables crisp when the whole plane is zoomed.
		this.density = Math.min(3, Math.max(1.8, window.devicePixelRatio));
		this.canvas.width = Math.round(width * this.density);
		this.canvas.height = Math.round(height * this.density);
		this.draw();
		if (changed) this.fit();
	},
	draw() {
		if (!this.width) return;
		const ctx = this.ctx;
		ctx.setTransform(this.density, 0, 0, this.density, 0, 0);
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.strokeStyle = '#737e6925';
		ctx.lineWidth = 1;
		ctx.setLineDash([2, 6]);
		for (const fraction of this.columns) {
			const x = this.width * fraction;
			ctx.beginPath();
			ctx.moveTo(x, 42);
			ctx.lineTo(x, this.height - 49);
			ctx.stroke();
		}
		ctx.setLineDash([]);
		for (const node of this.nodes) {
			if (!node.parent || !node.visible) continue;
			this.cable(node);
		}
	},
	cable(node) {
		const parent = node.parent;
		const ctx = this.ctx;
		const start = parent.x + parent.width / 2;
		const end = node.x - node.width / 2;
		const bend = (end - start) * .53;
		const active = node === this.current || parent === this.current || this.current?.parent === node;
		ctx.strokeStyle = this.catalog.families[node.genre.family].color;
		ctx.globalAlpha = active ? .95 : .68;
		ctx.lineWidth = active ? 2.2 : 1.8;
		ctx.beginPath();
		ctx.moveTo(start, parent.y);
		ctx.bezierCurveTo(start + bend, parent.y, end - bend, node.y, end, node.y);
		ctx.stroke();
		ctx.globalAlpha = 1;
	},
	wireCamera() {
		$('zoom-more').addEventListener('click', () => this.zoom(this.scale + .2));
		$('zoom-less').addEventListener('click', () => this.zoom(this.scale - .2));
		$('zoom-fit').addEventListener('click', () => this.fit());
		this.stage.addEventListener('wheel', event => {
			event.preventDefault();
			const box = this.stage.getBoundingClientRect();
			const delta = event.deltaY * (event.deltaMode === 1 ? 16 : 1);
			this.zoom(this.scale * Math.exp(-delta * .0014), event.clientX - box.left, event.clientY - box.top);
		}, { passive: false });
		this.stage.addEventListener('pointerdown', event => {
			if (event.button !== 0 || event.target.closest('button, .camera-tools') || this.pointer !== null) return;
			this.pointer = event.pointerId;
			this.grabX = event.clientX - this.dx;
			this.grabY = event.clientY - this.dy;
			this.stage.setPointerCapture(event.pointerId);
			this.stage.classList.add('is-dragging');
		});
		this.stage.addEventListener('pointermove', event => {
			if (event.pointerId !== this.pointer) return;
			this.dx = event.clientX - this.grabX;
			this.dy = event.clientY - this.grabY;
			this.transform();
		});
		this.stage.addEventListener('lostpointercapture', () => {
			this.pointer = null;
			this.stage.classList.remove('is-dragging');
		});
	},
	zoom(value, x = this.width / 2, y = this.height / 2) {
		const next = Math.max(.6, Math.min(1.8, value));
		this.dx = x - (x - this.dx) * next / this.scale;
		this.dy = y - (y - this.dy) * next / this.scale;
		this.scale = next;
		this.transform();
		this.updateZoom();
	},
	transform() {
		this.dx = Math.max(this.width * (.35 - this.scale), Math.min(this.width * .65, this.dx));
		this.dy = Math.max(this.height * (.35 - this.scale), Math.min(this.height * .65, this.dy));
		this.space.style.transform = `translate(${this.dx}px, ${this.dy}px) scale(${this.scale})`;
	},
	updateZoom() {
		this.readout.value = `${Math.round(this.scale * 100)}%`;
		$('zoom-less').disabled = this.scale <= .601;
		$('zoom-more').disabled = this.scale >= 1.799;
	},
	fit() {
		this.scale = 1;
		this.dx = 0;
		this.dy = 0;
		this.transform();
		this.updateZoom();
	},
	focus() {
		this.fit();
		this.current.button.focus({ preventScroll: true });
		this.stage.scrollIntoView({ block: 'nearest' });
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = lineageMap;
