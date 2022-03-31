import PropTypes from "prop-types";

const type = {
  no: PropTypes.number,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default type;
