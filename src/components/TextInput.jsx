const TextInput = ({
  placeholder,
  value,
  onChange,
  type,
  disabled,
  onSelectClick,
}) => {
  return (
    <div className="textinput__container">
      <input
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
      <div className="textinput__button">
        {onSelectClick && <button onClick={onSelectClick}>Select</button>}
      </div>
    </div>
  );
};

export default TextInput;
