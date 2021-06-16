import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import drawBB from "./drawBB";
import useInterval from "./useInterval";

export default function HandPoseModel({ videoRef }) {
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  async function detection() {
    if (model) {
      canvasRef.current.width = videoRef.props.videoConstraints.width;
      canvasRef.current.height = videoRef.props.videoConstraints.height;
      const { video } = videoRef;
      const predictions = await model.estimateHands(video);
      if (predictions.length > 0) {
        const ctx = canvasRef.current.getContext("2d");
        drawBB(predictions, ctx);
      } else {
        console.log("nuthin :(");
      }
    }
  }

  async function startModel() {
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
  }

  useEffect(() => {
    startModel();
  }, []);

  useInterval(
    () => {
      detection();
    },
    model ? 100 : null
  );

  return (
    <>
      {model && (
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid black",
            textAlign: "center",
          }}
        />
      )}
    </>
  );
}

HandPoseModel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  videoRef: PropTypes.object.isRequired,
};
