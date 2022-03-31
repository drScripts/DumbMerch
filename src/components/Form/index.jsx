import "./Form.css";

const Form = ({
  type = "text",
  placeHolder = "",
  name = "",
  onChange,
  value,
  className,
}) => {
  const onChangeForm = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  return (
    <input
      type={type}
      value={value}
      placeholder={placeHolder}
      onChange={onChangeForm}
      className={`custom-form-input ${className}`}
      name={name}
    />
  );
};

export default Form;
