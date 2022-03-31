import "./Card.css";
import { defaultVal, type } from "../../propTypes/CardType";

const Card = (props) => {
  const { className = "", children } = props;
  const classBuild = `form-card ${className}`;
  return <div className={classBuild}>{children}</div>;
};

Card.propTypes = type;
Card.propTypes = defaultVal;

export default Card;
