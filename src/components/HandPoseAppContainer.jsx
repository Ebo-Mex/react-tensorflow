/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomButon from "./CustomButton";
import UserWebcam from "./UserWebcam";

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

const videoContraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function HandPoseAppContainer() {
  const classes = useStyles();
  const [detect, setDetect] = useState(false);
  const [showCam, setShowCam] = useState(false);
  const webcamRef = useRef(null);

  // useEffect(() => {
  //   if (detect) {
  //   }
  // }, [detect]);

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
      {/* TODO inline style is not good practice! */}
      <h1 style={{ textAlign: "center" }}>Handpose Recognition</h1>
      <CustomButon
        txt={showCam ? "Stop Webcam" : "Start Webcam"}
        handleClick={handleCam}
      />
      {showCam && (
        <>
          <CustomButon
            txt={detect ? "Stop Recognition" : "Start Recognition"}
            handleClick={handleDet}
          />
          <UserWebcam ref={webcamRef} videoConstraints={videoContraints} />
        </>
      )}
    </div>
  );
}
