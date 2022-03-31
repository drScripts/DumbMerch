import "./Form.css";
import PropType, { defaultVal } from "../../propTypes/FormType";

const Form = (props) => {
  const { type, placeHolder, name, onChange, value, className } = props;

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

Form.propTypes = PropType;
Form.defaultProps = defaultVal;

export default Form;
