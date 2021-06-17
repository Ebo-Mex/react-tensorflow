import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import LinearProgress from "@material-ui/core/LinearProgress";
import drawBB from "./drawBB";
import useInterval from "./useInterval";

const useStyles = makeStyles(() => ({
  progressBar: {
    width: "100%",
    position: "absolute",
    top: 0,
  },
}));
// Use tf with handpose model to predict hand position
// draw the results in a canvas
export default function HandPoseModel({ video, width, height }) {
  const classes = useStyles();
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [modelError, setModelError] = useState(false);
  // Manage model predictions
  async function detection() {
    if (canvasRef.current) {
      // Adjust canvas size to match webcam size
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      // Wait for model predictions on frame
      const predictions = await model.estimateHands(video);
      // Draw predictions
      if (predictions.length > 0) {
        const ctx = canvasRef.current.getContext("2d");
        drawBB(predictions, ctx, width);
      } else {
        const ctx = canvasRef.current.getContext("2d");
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("No detection", 5, 30);
        ctx.stroke();
      }
    }
  }
  // Load model on first render
  useEffect(async () => {
    try {
      await tf.ready();
      const mod = await handpose.load();
      setModel(mod);
    } catch (err) {
      setModelError(true);
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
  function DisplayModel() {
    return model ? (
      <canvas ref={canvasRef} />
    ) : (
      <LinearProgress className={classes.progressBar} color="primary" />
    );
  }
  // Error placeholder
  return (
    <>
      {modelError ? (
        <p>There was an error. Please reload the page</p>
      ) : (
        <DisplayModel />
      )}
    </>
  );
}

HandPoseModel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  video: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
