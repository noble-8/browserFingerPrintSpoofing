const canvas = document.createElement("canvas");
canvas.id = "1337h4x0r";

const ctx = canvas.getContext("2d");

for (let i = 0; i < canvas.width; i++) {
	for (let j = 0; j < canvas.height; j++) {
		ctx.fillStyle =
			"rgb(" +
			Math.floor(Math.random() * 256) +
			"," +
			Math.floor(Math.random() * 256) +
			"," +
			Math.floor(Math.random() * 256) +
			"," +
			Math.floor(Math.random() * 256) +
			")";
		ctx.fillRect(i, j, 1, 1);
	}
}

const dataURL = canvas.toDataURL();

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
	get: () => () => ctx,
});

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
	get: () => () => dataURL,
});
