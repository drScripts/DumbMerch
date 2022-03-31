import PropTypes from "prop-types";

const type = {
  type: PropTypes.oneOf([
    "text",
    "file",
    "number",
    "color",
    "date",
    "datetime",
    "password",
    "email",
  ]),
  placeHolder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  className: PropTypes.string,
};

export const defaultVal = {
  type: "text",
  placeHolder: "",
  name: "",
  value: "",
  className: "",
};

export default type;
