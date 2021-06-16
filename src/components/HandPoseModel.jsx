import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import drawBB from "./drawBB";
import useInterval from "./useInterval";

// Use tf with handpose model to predict hand position
// draw the results in a canvas
export default function HandPoseModel({ video, width, height }) {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  // Manage model predictions
  async function detection() {
    // Adjust canvas size to match webcam size
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    // Wait for model predictions on frame
    const predictions = await model.estimateHands(video);
    // Draw predictions
    if (predictions.length > 0) {
      const ctx = canvasRef.current.getContext("2d");
      drawBB(predictions, ctx);
    } else {
      // TODO alert user of no detections
      console.log("nuthin :(");
    }
  }
  // Load model on first render
  useEffect(async () => {
    try {
      await tf.ready();
      const mod = await handpose.load();
      setModel(mod);
      // TODO loading icon
      console.log("model loaded!");
    } catch (err) {
      // TODO error handling
      console.log(err);
    }
  }, []);
  // Calls detection function every 100ms if the model is loaded
  useInterval(
    () => {
      detection();
    },
    model ? 100 : null
  );
  // Show canvas if model exists
  return <>{model && <canvas ref={canvasRef} />}</>;
}

HandPoseModel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  video: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
