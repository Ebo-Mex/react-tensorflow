import { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import HandPoseModel from "./HandPoseModel";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      position: "absolute",
    },
  },
}));

const videoContraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function HandPoseRecognition({ detect, showCam }) {
  const classes = useStyles();
  const webcamRef = useRef(null);

  return (
    <div className={classes.root}>
      {showCam && (
        <Webcam
          audio={false}
          ref={webcamRef}
          videoConstraints={videoContraints}
        />
      )}
      {detect && (
        <HandPoseModel
          video={webcamRef.current.video}
          width={webcamRef.current.props.videoConstraints.width}
          height={webcamRef.current.props.videoConstraints.height}
        />
      )}
    </div>
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
