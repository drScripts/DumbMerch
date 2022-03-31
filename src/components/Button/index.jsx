import "./Button.css";
import { defaultVal, type } from "../../propTypes/ButtonType";

const Button = (props) => {
  const { title, bgColor, fontColor, width, className, onClick } = props;

  const classButton = `classButton ${bgColor} ${fontColor} ${className} ${width}`;
  return (
    <button className={classButton} onClick={onClick}>
      {title}
    </button>
  );
};

Button.defaultProps = defaultVal;
Button.propTypes = type;

export default Button;
