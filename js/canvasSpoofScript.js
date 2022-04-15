let canvas = document.createElement("canvas");
canvas.id = "1337h4x0r";
const canvasWidth = 200;
const canvasHeight = 200;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";
var ctx = canvas.getContext("2d");
for(let i=0;i<canvasHeight;i++){
    for(let j=0;j<canvasWidth;j++){
        //fill a pixel with rgb and brightness
        ctx.fillStyle = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"
        ctx.fillRect(i,j,1,1);
    }
}
//spoofed value generation
ctx = canvas.getContext("2d");
const dataURL = canvas.toDataURL();
Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
	get: () => () =>
	dataURL,
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
	get: () => () => ctx,
});
