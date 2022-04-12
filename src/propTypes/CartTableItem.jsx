import PropTypes from "prop-types";

const type = {
  no: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  product: PropTypes.object.isRequired,
  qty: PropTypes.number.isRequired,
  onQtyChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default type;
