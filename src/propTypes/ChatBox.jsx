import PropTypes from "prop-types";

const type = {
  name: PropTypes.string.isRequired,
  chat: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  profilePict: PropTypes.string.isRequired,
};

export default type;
