import { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const videoContraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    // eslint-disable-next-line no-unused-vars
    const imageSrc = webcamRef.current.getScreenshot();
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        width={420}
        height={420}
        ref={webcamRef}
        screenshotFormat="image/jpg"
        videoConstraints={videoContraints}
      />
      <button type="button" onClick={capture}>
        Capture
      </button>
    </>
  );
};

function App() {
  const [cam, setCam] = useState(false);

  const handleClick = () => {
    setCam((prev) => !prev);
  };
  return (
    <div className="App">
      <p> xd </p>
      <button type="button" onClick={handleClick}>
        Turn on cam
      </button>
      {cam ? <WebcamCapture /> : ""}
    </div>
  );
}

export default App;
