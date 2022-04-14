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

Object.defineProperty(navigator, "userAgentData", {
	get: () => undefined,
});

Object.defineProperty(navigator, "languages", {
	get: () => ["en-US", "en"],
});

Object.defineProperty(navigator, "deviceMemory", {
	get: () => undefined,
});

Object.defineProperty(navigator, "getBattery", {
	get: () => () => undefined,
});

Object.defineProperty(navigator, "connection", {
	get: () => undefined,
});

Object.defineProperty(navigator.keyboard, "getLayoutMap", {
	get: () => () => undefined,
});

Object.defineProperty(navigator, "mediaDevices", {
	get: () => undefined,
});

Object.defineProperty(screen, "width", {
	get: () => 1498,
});

Object.defineProperty(screen, "height", {
	get: () => 699,
});

Object.defineProperty(screen, "availWidth", {
	get: () => 1498,
});

Object.defineProperty(screen, "availHeight", {
	get: () => 699,
});

Object.defineProperty(Date.prototype, "getTimezoneOffset", {
	get: () => () => 0,
});

Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
	get: () => () => {
		return {
			locale: "en-US",
			calendar: "gregory",
			numberingSystem: "latn",
			timeZone: "UTC",
			year: "numeric",
			month: "numeric",
			day: "numeric",
		};
	},
});

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
	get: () => () =>
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAA8CAYAAABIFuztAAABjklEQVR4nO3VoQ3CAABFwXYSEN2ABIMiFSQgOkFNEThGwJEOwAwMwQRMQEDhCZIFWACF6W9y+sxzr+g3zfZTTo718/XeX6a7dnnqrvPVYVYtzrfH+s4555z/8mLoAM455+N0A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOefcQDjnnBsI55zzcDcQzjnnBsI559xAOOech7uBcM45NxDOOecGwjnnPNwNhHPOuYFwzjk3EM455+FuIJxzzg2Ec865gXDOOQ93A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOefcQDjnnBsI55zzcDcQzjnnBsI559xAOOech7uBcM45NxDOOecGwjnnPNwNhHPOuYFwzjk3EM455+FuIJxzzg2Ec865gXDOOQ93A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOef8L/8Cl9z3SWtDbpIAAAAASUVORK5CYII=",
});
