import "./Card.css";

const Card = (props) => {
  const { className = "", children } = props;
  const classBuild = `form-card ${className}`;
  return <div className={classBuild}>{children}</div>;
};

export default Card;
