/* eslint-disable no-unused-vars */
import { forwardRef } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";

const UserWebcam = forwardRef((props, ref) => {
  return (
    <Webcam audio={false} ref={ref} videoConstraints={props.videoContraints} />
  );
});

UserWebcam.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  videoContraints: PropTypes.object,
};

UserWebcam.defaultProps = {
  videoContraints: {},
};

export default UserWebcam;
