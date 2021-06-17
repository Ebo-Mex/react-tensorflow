/* eslint-disable no-unused-vars */
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import CustomButon from "./CustomButton";
import HandPoseRecognition from "./HandPoseRecognition";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    "& > *": {
      margin: theme.spacing(4),
    },
  },
  instructions: {
    backgroundColor: theme.palette.info.main,
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  footer: {
    position: "fixed",
    bottom: 0,
    backgroundColor: theme.palette.info.main,
    margin: 0,
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 5,
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
      <Paper elevation={1} component="main" className={classes.instructions}>
        <p>
          To use the demo, first start your webcam and then press the start
          recognition button.
        </p>
        <Divider style={{ width: "100%" }} />
        <p>Only one hand can be recognized at a time.</p>
        <Divider style={{ width: "100%" }} />
        <p>Have fun!</p>
      </Paper>

      <div className={classes.buttonContainer}>
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
      </div>
      <HandPoseRecognition detect={detect} showCam={showCam} />
      <Paper elevation={1} component="footer" className={classes.footer}>
        2021. Created with ❤️ by Emmanuel Bolaños
        <Link href="https://www.linkedin.com/in/emmanuelbolanos/">
          <LinkedInIcon className={classes.icon} fontSize="small" />
        </Link>
      </Paper>
    </div>
  );
}
