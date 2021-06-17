export default function drawBB(detections, ctx, videoWidth) {
  // Loop through each prediction (just 1 atm)
  detections.forEach((prediction) => {
    // Extract box and confidence
    const { bottomRight, topLeft } = prediction.boundingBox;
    // Set styling
    ctx.lineWidth = "3";
    ctx.strokeStyle = "green";
    // Calculate BB position
    const [x, y] = topLeft;
    const width = Math.abs(bottomRight[0] - topLeft[0]);
    const height = Math.abs(bottomRight[1] - topLeft[1]);
    // Draw rectangle
    ctx.beginPath();
    // Flip to fit mirrored frame
    ctx.translate(videoWidth, 0);
    ctx.scale(-1, 1);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
}
