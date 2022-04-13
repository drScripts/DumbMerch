import "./Button.css";
import { defaultVal, type } from "../../propTypes/ButtonType";
import loading from "../../assets/loading.gif";

const Button = (props) => {
  const {
    title,
    bgColor,
    fontColor,
    width,
    className,
    onClick,
    isLoading = false,
    isDisabled,
  } = props;

  const classButton = `classButton ${bgColor} ${fontColor} ${className} ${width}`;
  return (
    <>
      <button
        className={classButton}
        onClick={onClick}
        disabled={isLoading || isDisabled}
      >
        {isLoading && (
          <img
            src={loading}
            alt="loading animation"
            className="me-2"
            width={30}
            height={30}
          />
        )}
        {title}
      </button>
    </>
  );
};

Button.defaultProps = defaultVal;
Button.propTypes = type;

export default Button;
