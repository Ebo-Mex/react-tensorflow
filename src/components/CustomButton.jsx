import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default function CustomButton({ txt, handleClick }) {
  return (
    <Button
      value="showCam"
      type="button"
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      {txt}
    </Button>
  );
}

CustomButton.propTypes = {
  txt: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
