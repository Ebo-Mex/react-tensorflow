/* eslint-disable no-unused-vars */
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomButon from "./CustomButton";
import HandPoseRecognition from "./HandPoseRecognition";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));
// Allow user to start/stop WebCam and HandPose Recognition Model
export default function HandPoseAppContainer() {
  const classes = useStyles();
  const [detect, setDetect] = useState(false);
  const [showCam, setShowCam] = useState(false);
  // Click handlers
  const handleCam = () => {
    if (showCam) {
      setDetect(false);
      setShowCam(false);
    } else {
      setShowCam(true);
    }
  };
  const handleDet = () => {
    setDetect((prev) => !prev);
  };
  return (
    <div className={classes.root}>
      <h1>Handpose Recognition</h1>
      <CustomButon
        txt={showCam ? "Stop Webcam" : "Start Webcam"}
        handleClick={handleCam}
      />
      {showCam && (
        <CustomButon
          txt={detect ? "Stop Recognition" : "Start Recognition"}
          handleClick={handleDet}
        />
      )}
      <HandPoseRecognition detect={detect} showCam={showCam} />
    </div>
  );
}
