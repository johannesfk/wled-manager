<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let { baseUrl }: { baseUrl: string } = $props();
	let ws: WebSocket;
	let tmout: 0 | ReturnType<typeof setTimeout>;
	let canv: HTMLCanvasElement;
	let parent: HTMLElement;
	let ctx: CanvasRenderingContext2D | null;
	let tempCanvas: HTMLCanvasElement;
	let tempCtx: CanvasRenderingContext2D | null;
	let brightness = 1.75;

	function setupWebSocket() {
		if (typeof window !== 'undefined') {
			if (!ws || ws.readyState !== WebSocket.OPEN) {
				ws = new WebSocket(`${baseUrl.replace('http', 'ws')}/ws`);
				ws.onopen = () => ws.send("{'lv':true}");
				ws.binaryType = 'arraybuffer';
				ws.addEventListener('message', handleWebSocketMessage);
			} else {
				ws.send("{'lv':true}");
			}
		}
	}

	function handleWebSocketMessage(event: MessageEvent) {
		try {
			if (event.data instanceof ArrayBuffer) {
				let e = new Uint8Array(event.data);
				if (e[0] !== 76) return;
				renderCanvas(e);
			}
		} catch (e) {
			console.error('Peek WS error:', e);
		}
	}

	function resizeCanvas() {
		canv.width = parent.offsetWidth;
		canv.height = parent.offsetHeight;
	}

	function renderCanvas(rgbData: Uint8Array) {
		if (!ctx) return;
		let startSkip = rgbData[1] === 2 ? 4 : 2;
		const numPixels = (rgbData.length - startSkip) / 3; // Number of pixels
		const width = numPixels; // Display as a 1-pixel tall horizontal line
		const height = 1;

		// Create ImageData (Canvas requires RGBA, so we need to add Alpha)
		const imageData = ctx.createImageData(width, height);
		for (let i = startSkip, j = 0; i < rgbData.length; i += 3, j++) {
			let r = rgbData[i];
			let g = rgbData[i + 1];
			let b = rgbData[i + 2];
			const alpha = 255;

			// Apply brightness filter
			r = Math.min(255, r * brightness);
			g = Math.min(255, g * brightness);
			b = Math.min(255, b * brightness);

			imageData.data[j * 4] = r; // Red
			imageData.data[j * 4 + 1] = g; // Green
			imageData.data[j * 4 + 2] = b; // Blue
			imageData.data[j * 4 + 3] = alpha; // Alpha
		}

		// Clear and draw on canvas
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.putImageData(imageData, 0, 0);

		if (!tempCanvas) {
			tempCanvas = document.createElement('canvas');
			tempCtx = tempCanvas.getContext('2d');
		}

		tempCanvas.width = width;
		tempCanvas.height = height;
		tempCtx?.putImageData(imageData, 0, 0);

		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.drawImage(tempCanvas, 0, 0, width, height, 0, 0, canv.width, canv.height);

		// Scale the canvas content to fit the parent
		// ctx.scale(canv.width / width, canv.height / height);
		// ctx.drawImage(canv, 0, 0);
		// ctx.drawImage(canv, 0, 0, width, height, 0, 0, canv.width, canv.height);
	}
	onMount(() => {
		if (typeof window !== 'undefined') {
			console.log('Component mounted');
			if (canv) {
				ctx = canv.getContext('2d');
				resizeCanvas();
			}
			window.addEventListener('resize', resizeCanvas);
			setupWebSocket();
		}
	});

	onDestroy(() => {
		clearTimeout(tmout);
		if (ws) {
			ws.removeEventListener('message', handleWebSocketMessage);
			ws.close();
		}
		window.removeEventListener('resize', resizeCanvas);
		console.log('Component destroyed');
	});
</script>

<div bind:this={parent} id="parent">
	<canvas id="canvas" bind:this={canv}></canvas>
</div>

<style>
	#parent {
		width: 100%;
		height: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
