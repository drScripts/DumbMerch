import "./ChatInput.css";
import PropType, { defaultVal } from "../../propTypes/ChatInput";
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const ChatInput = (props) => {
  const { onSend, onTextChange, value, className } = props;
  const onChange = (e) => {
    onTextChange(e.target.value);
  };

  const onKeyHandler = (e) => {
    if (e.code === "Enter") {
      onSend();
    }
  };

  return (
    <InputGroup className={`input-fill px-3 ${className}`}>
      <FormControl
        className="border-none input"
        aria-label="Dollar amount (with dot and two decimal places)"
        placeholder="Send Message"
        onChange={onChange}
        value={value}
        onKeyDown={onKeyHandler}
      />
      <button className="send-button bg-transparent" onClick={onSend}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#F74D4D"
          className="bi bi-send"
          viewBox="0 0 16 16"
        >
          <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
        </svg>
      </button>
    </InputGroup>
  );
};

ChatInput.propTypes = PropType;
ChatInput.defaultProps = defaultVal;

export default ChatInput;
