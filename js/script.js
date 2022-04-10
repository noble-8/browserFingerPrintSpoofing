window.onload = () => {
	function injectScript() {
		Object.defineProperty(window.navigator, "platform", {
			get: () => "Linux",
		});

		Object.defineProperty(window.navigator, "plugins", {
			get: () => {
				return {
					length: 0,
					item: () => null,
					namedItem: () => null,
					refresh: () => {},
				};
			},
		});
		console.log(window.navigator.platform);
	}

	// injectScript();

	for (const elem of document.querySelectorAll("canvas")) {
		elem.setAttribute("width", "20px");
		var ctx = elem.getContext("2d");
		// Create gradient
		var grd = ctx.createLinearGradient(0, 0, 200, 0);
		grd.addColorStop(0, "red");
		grd.addColorStop(1, "white");
		// Fill with gradient
		ctx.fillStyle = grd;
		ctx.fillRect(10, 10, 150, 80);
	}

	for (const elem of document.querySelectorAll("img")) {
		elem.setAttribute("src", "");
	}
};
