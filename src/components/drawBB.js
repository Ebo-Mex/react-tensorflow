// eslint-disable-next-line no-unused-vars
export default function drawBB(detections, ctx) {
  // Loop through each prediction
  detections.forEach((prediction) => {
    // Extract boxes and classes
    const { bottomRight, topLeft } = prediction.boundingBox;
    // const text = prediction.class;

    // Set styling
    ctx.strokeStyle = `red`;
    ctx.font = "18px Arial";

    // console.log("tl", topLeft);
    // console.log("br", bottomRight);
    const [x, y] = topLeft;
    const width = bottomRight[0] - topLeft[0];
    const height = bottomRight[1] - topLeft[1];
    // console.log(x, y);
    // console.log(width, height);

    // Draw rectangle
    ctx.beginPath();
    ctx.fillStyle = `red`;
    ctx.rect(x, y, width / 2, height / 2);
    ctx.stroke();
  });
}
