// owns: lineage layout, branch and influence rendering, filtering and camera
// edit for: node interaction, graph geometry, secondary arcs and zoom
const lineageMap = {
	branch: 'all', current: null, nodes: [], links: [], byId: new Map(),
	scale: 1, dx: 0, dy: 0, pointer: null, capture: null, dragging: false,
	init(catalog, choose) {
		this.catalog = catalog;
		this.choose = choose;
		this.stage = $('plot-stage');
		this.space = $('plot-space');
		this.canvas = $('canv');
		this.ctx = this.canvas.getContext('2d');
		this.layer = $('plot-nodes');
		this.picker = $('branch-pick');
		this.readout = $('zoom-readout');
		this.guides = $('plot-guides').children;
		this.makeNodes();
		this.makeGuides();
		this.makeKey();
		this.picker.addEventListener('change', () => this.filter(this.picker.value));
		this.wireCamera();
		this.resize = new ResizeObserver(() => this.layout());
		this.resize.observe(this.stage);
		this.layout();
	},
	makeNodes() {
		this.depth = 0;
		this.roots = [];
		for (const genre of this.catalog.genres) {
			const node = { genre, children: [], button: document.createElement('button'), x: 0, y: 0, width: 0, height: 0, unit: 0, visible: true };
			this.nodes.push(node);
			this.byId.set(genre.id, node);
		}
		for (const node of this.nodes) {
			node.parent = this.byId.get(node.genre.parent);
			if (node.parent) node.parent.children.push(node);
			else this.roots.push(node);
			for (const [sourceId] of node.genre.influences) {
				const source = this.byId.get(sourceId);
				if (source) this.links.push({ source, target: node });
			}
		}
		for (const node of this.roots) this.decorateNode(node, 0);
	},
	decorateNode(node, depth) {
		const { genre, button, children } = node;
		const family = this.catalog.families[genre.family];
		node.depth = depth;
		this.depth = Math.max(this.depth, depth);
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
		button.addEventListener('focus', () => {
			if (button.matches(':focus-visible')) this.revealNode(node);
		});
		this.layer.append(button);
		for (const child of children) this.decorateNode(child, depth + 1);
	},
	makeGuides() {
		const labels = this.catalog.generations;
		for (let depth = 0; depth < this.depth + 1; depth++) {
			const guide = document.createElement('span');
			guide.innerHTML = `<b>${String(depth + 1).padStart(2, '0')}</b>${labels[depth] || labels.at(-1)}`;
			$('plot-guides').append(guide);
		}
	},
	makeKey() {
		const items = $('key-items');
		for (const [id, family] of Object.entries(this.catalog.families)) {
			const item = document.createElement('span');
			item.className = 'key-item';
			item.dataset.family = id;
			item.innerHTML = `${atlasDot(family.color)}${family.label}`;
			items.append(item);
			this.picker.add(new Option(family.label, id));
		}
		this.influenceKey = document.createElement('span');
		this.influenceKey.className = 'key-item is-edge';
		this.influenceKey.innerHTML = '<i class="dash-mark" aria-hidden="true"></i>Influence';
		items.append(this.influenceKey);
		this.keyItems = items.children;
	},
	filter(id) {
		this.branch = id;
		this.picker.value = id;
		this.layout();
		if (id !== 'all') this.choose((this.byId.get(id) || this.nodes.find(node => node.genre.family === id)).genre.id, false);
	},
	select(genre) {
		if (this.branch !== 'all' && !this.byId.get(genre.id).visible) this.filter('all');
		this.current = this.byId.get(genre.id);
		for (const node of this.nodes) {
			const picked = node === this.current;
			node.button.classList.toggle('is-picked', picked);
			node.button.setAttribute('aria-pressed', String(picked));
		}
		this.draw();
		this.revealNode(this.current);
	},
	isAncestor(ancestor, node) {
		for (let step = node; step; step = step.parent) {
			if (step === ancestor) return true;
		}
		return false;
	},
	measure(node, first) {
		if (!node.visible) return 0;
		let span = 0;
		for (const child of node.children) span += this.measure(child, first + span);
		span = Math.max(1, span);
		node.unit = first + span / 2;
		return span;
	},
	markVisible() {
		for (const node of this.nodes) node.visible = false;
		for (const node of this.nodes) {
			if (this.branch !== 'all' && node.genre.family !== this.branch) continue;
			for (let step = node; step && !step.visible; step = step.parent) step.visible = true;
		}
	},
	measureForest() {
		let slots = 0;
		for (const node of this.roots) slots += this.measure(node, slots);
		return slots;
	},
	layout() {
		const viewWidth = this.stage.clientWidth;
		const height = this.stage.clientHeight;
		if (!viewWidth || !height) return;
		const changed = viewWidth !== this.viewWidth || height !== this.height;
		// Keep a legible plane even when the viewport cannot show every column at once.
		const width = Math.max(viewWidth, (this.depth + 1) * 96);
		this.viewWidth = viewWidth;
		this.width = width;
		this.height = height;
		this.space.style.width = `${width}px`;
		this.compact = width / Math.max(1, this.depth) < 216;
		this.stage.classList.toggle('is-compact', this.compact);
		this.columns = this.computeColumns();
		this.markVisible();
		let count = 0;
		for (const node of this.nodes) {
			node.button.hidden = !node.visible;
			if (node.visible) count++;
		}
		const slots = this.measureForest();
		const inset = this.compact ? 39 : 45;
		const step = (height - inset - 54) / slots;
		const span = this.depth ? width * (this.columns[this.depth] - this.columns[0]) / this.depth : width * .3;
		const gap = this.compact ? Math.min(18, span * .17) : 26;
		const nodeWidth = Math.min(155, span - gap);
		this.stage.classList.toggle('is-tight', nodeWidth < 80);
		this.stage.style.setProperty('--node-height', `${step - 4}px`);
		for (const node of this.nodes) {
			if (!node.visible) continue;
			node.x = width * this.columns[node.depth];
			node.y = inset + node.unit * step;
			node.width = nodeWidth;
			node.button.style.left = `${node.x}px`;
			node.button.style.top = `${node.y}px`;
			node.button.style.width = `${node.width}px`;
			// A fixed slot keeps cards aligned even if a label ever outgrows its card.
			node.height = node.button.offsetHeight;
			this.fitLabel(node);
		}
		for (let i = 0; i < this.columns.length; i++) this.guides[i].style.left = `${this.columns[i] * 100}%`;
		for (const item of this.keyItems) {
			const family = item.dataset.family;
			if (!family) continue;
			item.classList.toggle('is-muted', !this.nodes.some(node => node.visible && node.genre.family === family));
		}
		const hasInfluence = this.links.some(link => link.source.visible && link.target.visible);
		this.influenceKey.classList.toggle('is-muted', !hasInfluence);
		$('node-count').textContent = `${count} nodes`;
		// Oversampling keeps thin cables crisp when the whole plane is zoomed.
		this.density = Math.min(3, Math.max(1.8, window.devicePixelRatio));
		this.canvas.width = Math.round(width * this.density);
		this.canvas.height = Math.round(height * this.density);
		this.draw();
		if (changed) this.setCamera(1);
		this.revealNode(this.current);
	},
	// Narrow cards shrink a long name rather than wrapping it into the next row.
	fitLabel(node) {
		const name = node.button.firstElementChild.nextElementSibling.firstElementChild;
		name.style.fontSize = '';
		const room = node.button.clientWidth - name.offsetLeft - 9;
		if (room <= 0 || name.scrollWidth <= room) return;
		const size = parseFloat(getComputedStyle(name).fontSize) * room / name.scrollWidth;
		name.style.fontSize = `${Math.max(8, size).toFixed(2)}px`;
	},
	computeColumns() {
		const inset = this.compact ? .115 : .145;
		const columns = new Array(this.depth + 1);
		for (let i = 0; i < columns.length; i++) columns[i] = inset + (1 - 2 * inset) * i / Math.max(1, this.depth);
		return columns;
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
		this.drawInfluences(false);
		for (const node of this.nodes) {
			if (node.parent && node.visible) this.cable(node);
		}
		this.drawInfluences(true);
		ctx.globalAlpha = 1;
	},
	drawInfluences(activePass) {
		for (const link of this.links) {
			if (!link.source.visible || !link.target.visible) continue;
			const active = link.source === this.current || link.target === this.current;
			if (active === activePass) this.influence(link, active);
		}
	},
	cable(node) {
		const parent = node.parent;
		const ctx = this.ctx;
		const start = parent.x + parent.width / 2;
		const end = node.x - node.width / 2;
		const bend = (end - start) * .53;
		const active = parent === this.current || this.isAncestor(node, this.current);
		ctx.strokeStyle = this.catalog.families[node.genre.family].color;
		ctx.globalAlpha = active ? .95 : .68;
		ctx.lineWidth = active ? 2.2 : 1.8;
		ctx.setLineDash([]);
		ctx.beginPath();
		ctx.moveTo(start, parent.y);
		ctx.bezierCurveTo(start + bend, parent.y, end - bend, node.y, end, node.y);
		ctx.stroke();
	},
	influence(link, active) {
		const { source, target } = link;
		const ctx = this.ctx;
		ctx.strokeStyle = this.catalog.families[source.genre.family].color;
		ctx.globalAlpha = active ? .9 : .3;
		ctx.lineWidth = active ? 1.7 : 1.25;
		ctx.setLineDash(active ? [5, 4] : [3.5, 4.5]);
		if (source.depth === target.depth) return this.columnInfluence(source, target);
		const forward = source.x < target.x ? 1 : -1;
		const sy = source.y + Math.sign(target.y - source.y) * 5;
		const ey = target.y + Math.sign(source.y - target.y) * 6;
		const sx = source.x + forward * source.width / 2;
		const ex = target.x - forward * (target.width / 2 + 2);
		const bend = (ex - sx) * .5;
		ctx.beginPath();
		ctx.moveTo(sx, sy);
		ctx.bezierCurveTo(sx + bend, sy, ex - bend, ey, ex, ey);
		ctx.stroke();
		this.arrow(ex, ey, forward > 0 ? 0 : Math.PI);
	},
	columnInfluence(source, target) {
		const ctx = this.ctx;
		const dir = Math.sign(target.y - source.y) || 1;
		const gap = Math.abs(target.y - source.y) - (source.height + target.height) / 2;
		if (gap < 12 || (!source.children.length && !target.children.length)) {
			const sx = source.x + source.width / 2 + 2;
			const ex = target.x + target.width / 2 + 3;
			const cx = Math.min(this.width - 5, Math.max(sx, ex) + (this.compact ? 11 : 22));
			ctx.beginPath();
			ctx.moveTo(sx, source.y);
			ctx.bezierCurveTo(cx, source.y, cx, target.y, ex, target.y);
			ctx.stroke();
			this.arrow(ex, target.y, Math.PI);
			return;
		}
		const sy = source.y + dir * (source.height / 2 + 2);
		const ey = target.y - dir * (target.height / 2 + 3);
		const cx = source.x - (this.compact ? 11 : 18);
		const cy = (sy + ey) / 2;
		ctx.beginPath();
		ctx.moveTo(source.x, sy);
		ctx.quadraticCurveTo(cx, cy, target.x, ey);
		ctx.stroke();
		this.arrow(target.x, ey, Math.atan2(ey - cy, target.x - cx));
	},
	arrow(x, y, angle) {
		const ctx = this.ctx;
		const size = 4.5;
		ctx.setLineDash([]);
		ctx.beginPath();
		ctx.moveTo(x - size * Math.cos(angle - .56), y - size * Math.sin(angle - .56));
		ctx.lineTo(x, y);
		ctx.lineTo(x - size * Math.cos(angle + .56), y - size * Math.sin(angle + .56));
		ctx.stroke();
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
			if (event.button !== 0 || event.target.closest('.camera-tools') || this.pointer !== null) return;
			this.pointer = event.pointerId;
			this.grabX = event.clientX - this.dx;
			this.grabY = event.clientY - this.dy;
			this.capture = event.target;
			this.capture.setPointerCapture(this.pointer);
		});
		this.stage.addEventListener('pointermove', event => {
			if (event.pointerId !== this.pointer) return;
			const dx = event.clientX - this.grabX;
			const dy = event.clientY - this.grabY;
			if (!this.dragging) {
				if (Math.hypot(dx - this.dx, dy - this.dy) < 5) return;
				// Transfer capture so drags starting on a card never activate it on release.
				this.dragging = true;
				this.capture = this.stage;
				this.capture.setPointerCapture(this.pointer);
				this.stage.classList.add('is-dragging');
			}
			this.dx = dx;
			this.dy = dy;
			this.transform();
		});
		this.stage.addEventListener('lostpointercapture', event => {
			if (event.pointerId !== this.pointer || event.target !== this.capture) return;
			this.pointer = this.capture = null;
			this.dragging = false;
			this.stage.classList.remove('is-dragging');
		});
	},
	zoom(value, x = this.viewWidth / 2, y = this.height / 2) {
		const next = Math.max(this.minScale(), Math.min(1.8, value));
		this.setCamera(next, x - (x - this.dx) * next / this.scale, y - (y - this.dy) * next / this.scale);
	},
	setCamera(scale, dx = 0, dy = 0) {
		this.scale = scale;
		this.dx = dx;
		this.dy = dy;
		this.transform();
		this.updateZoom();
	},
	transform() {
		this.dx = Math.max(this.viewWidth * .35 - this.width * this.scale, Math.min(this.viewWidth * .65, this.dx));
		this.dy = Math.max(this.height * (.35 - this.scale), Math.min(this.height * .65, this.dy));
		this.space.style.transform = `translate(${this.dx}px, ${this.dy}px) scale(${this.scale})`;
	},
	updateZoom() {
		this.readout.value = `${Math.round(this.scale * 100)}%`;
		$('zoom-less').disabled = this.scale <= this.minScale() + .001;
		$('zoom-more').disabled = this.scale >= 1.799;
	},
	fitScale() {
		return this.viewWidth / this.width;
	},
	minScale() {
		return Math.min(.6, this.fitScale());
	},
	fit() {
		const scale = this.fitScale();
		this.setCamera(scale, 0, this.height * (1 - scale) / 2);
	},
	revealNode(node) {
		if (!node?.visible || !this.width) return;
		const x = node.x * this.scale + this.dx;
		const y = node.y * this.scale + this.dy;
		const halfWidth = (node.width / 2 + 8) * this.scale;
		const halfHeight = (node.height / 2 + 8) * this.scale;
		const dx = Math.max(halfWidth - x, 0) - Math.max(x + halfWidth - this.viewWidth, 0);
		const dy = Math.max(halfHeight - y, 0) - Math.max(y + halfHeight - (this.height - 47), 0);
		if (!dx && !dy) return;
		this.dx += dx;
		this.dy += dy;
		this.transform();
	},
	focus() {
		if (this.scale < 1) this.zoom(1);
		this.revealNode(this.current);
		this.current.button.focus({ preventScroll: true });
		this.stage.scrollIntoView({ block: 'nearest' });
	}
};

if (typeof module !== 'undefined' && module.exports) module.exports = lineageMap;
