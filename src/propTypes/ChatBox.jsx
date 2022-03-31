import PropTypes from "prop-types";

const type = {
  name: PropTypes.string.isRequired,
  chat: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  profilePict: PropTypes.string.isRequired,
};

export default type;
