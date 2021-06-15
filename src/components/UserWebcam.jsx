/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import drawBB from "./drawBB";
import useInterval from "./useInterval";

const videoContraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function UserWebcam() {
  const [detect, setDetect] = useState(false);
  const [model, setModel] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  async function detection() {
    if (model) {
      canvasRef.current.width = webcamRef.current.props.videoConstraints.width;
      canvasRef.current.height =
        webcamRef.current.props.videoConstraints.height;
      const { video } = webcamRef.current;
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
    detect ? 100 : null
  );

  const startDetection = () => {
    setDetect((prev) => !prev);
  };

  return (
    <>
      <button type="button" onClick={startDetection}>
        Detect
      </button>
      <Webcam
        audio={false}
        ref={webcamRef}
        videoConstraints={videoContraints}
      />
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid black",
          textAlign: "center",
        }}
      />
    </>
  );
}
