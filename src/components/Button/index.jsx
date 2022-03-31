import "./Button.css";

const Button = ({
  title = "",
  bgColor = "bg-none",
  fontColor = "c-white",
  width = "",
  className,
  onClick,
}) => {
  const classButton = `classButton ${bgColor} ${fontColor} ${className} ${width}`;
  return (
    <button className={classButton} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
