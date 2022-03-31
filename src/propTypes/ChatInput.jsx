import PropTypes from "prop-types";

const type = {
  onSend: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};

export const defaultVal = { value: "", className: "" };

export default type;
