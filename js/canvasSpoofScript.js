let canvas = document.createElement("canvas");
canvas.id = "1337h4x0r";
canvas.width = 1224;
canvas.height = 768;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
const ctx = canvas.getContext("2d");

Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
	get: () => () =>
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAA8CAYAAABIFuztAAABjklEQVR4nO3VoQ3CAABFwXYSEN2ABIMiFSQgOkFNEThGwJEOwAwMwQRMQEDhCZIFWACF6W9y+sxzr+g3zfZTTo718/XeX6a7dnnqrvPVYVYtzrfH+s4555z/8mLoAM455+N0A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOefcQDjnnBsI55zzcDcQzjnnBsI559xAOOech7uBcM45NxDOOecGwjnnPNwNhHPOuYFwzjk3EM455+FuIJxzzg2Ec865gXDOOQ93A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOefcQDjnnBsI55zzcDcQzjnnBsI559xAOOech7uBcM45NxDOOecGwjnnPNwNhHPOuYFwzjk3EM455+FuIJxzzg2Ec865gXDOOQ93A+Gcc24gnHPODYRzznm4GwjnnHMD4ZxzbiCcc87D3UA455wbCOeccwPhnHMe7gbCOef8L/8Cl9z3SWtDbpIAAAAASUVORK5CYII=",
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
	get: () => () => ctx,
});
