var canvas = document.createElement('canvas');
canvas.id     = "CursorLayer";
canvas.width  = 1224;
canvas.height = 768;
canvas.style.zIndex   = 8;
canvas.style.position = "absolute";
canvas.style.border   = "1px solid";
var ctx = canvas.getContext("2d");


Object.defineProperty(navigator, "platform", {
	get: () => "Linux",
});

Object.defineProperty(navigator, "plugins", {
	get: () => {
		return {
			length: 0,
			item: () => null,
			namedItem: () => null,
			refresh: () => {},
		};
	},
});

Object.defineProperty(navigator, "userAgent", {
	get: () =>
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
});

Object.defineProperty(navigator, "languages", {
	get: () => ["en-US", "en"],
});

Object.defineProperty(navigator, "deviceMemory", {
	get: () => undefined,
});

Object.defineProperty(screen, "width", {
	get: () => 1498,
});

Object.defineProperty(screen, "height", {
	get: () => 699,
});

Object.defineProperty(window.HTMLCanvasElement.prototype, "toDataURL", {
	get: () => () => "https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png" ,
});


Object.defineProperty(window.HTMLCanvasElement.prototype, "getContext", {
	get: () => () => ctx
});
