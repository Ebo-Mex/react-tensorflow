export default function drawBB(detections, ctx) {
  // Loop through each prediction (just 1 atm)
  detections.forEach((prediction) => {
    // Extract box and confidence
    const { bottomRight, topLeft } = prediction.boundingBox;
    const { handInViewConfidence } = prediction;
    // Set styling
    ctx.strokeStyle = "red";
    ctx.font = "30px Arial";
    // Calculate BB position
    const [x, y] = topLeft;
    const width = bottomRight[0] - topLeft[0];
    const height = bottomRight[1] - topLeft[1];
    // Draw text & rectangle
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.rect(x, y, width / 2, height / 2);
    ctx.fillText(
      `${Math.floor(handInViewConfidence * 100)}% sure that is a hand`,
      x,
      y
    );
    ctx.stroke();
  });
}
