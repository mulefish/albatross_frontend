let mouseIsDown = false
function mouseUp(xy) {
    mouseIsDown = false;
 //   console.log("mUP " + JSON.stringify( xy ))
}
function mouseDown(xy) {
    mouseIsDown = true;
 //   console.log("mDown " + JSON.stringify( xy ))

}
function mouseMove(xy) {
        drawLine( xy );
}
function clicks(xy) { 
  //  console.log("clicks " + JSON.stringify( xy ))
    addStone(xy)
}
function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}