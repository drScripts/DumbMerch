import PropTypes from "prop-types";

const type = {
  title: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  fontColor: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

const defaultVal = {
  bgColor: "bg-none",
  fontColor: "c-white",
  width: "",
  className: "",
  isLoading: false,
  isDisabled: false,
};

export { type, defaultVal };
