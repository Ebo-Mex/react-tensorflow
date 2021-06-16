import { useRef } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import HandPoseModel from "./HandPoseModel";

const videoContraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function HandPoseRecognition({ detect, showCam }) {
  const webcamRef = useRef(null);

  return (
    <>
      {showCam && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoContraints}
        />
      )}
      {detect && <HandPoseModel videoRef={webcamRef.current} />}
    </>
  );
}

HandPoseRecognition.propTypes = {
  detect: PropTypes.bool,
  showCam: PropTypes.bool,
};

HandPoseRecognition.defaultProps = {
  detect: false,
  showCam: false,
};
