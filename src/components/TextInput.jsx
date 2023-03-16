const TextInput = ({
  placeholder,
  defaultValue,
  onChange,
  type,
  disabled,
  value,
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
        defaultValue={defaultValue}
      />
      <div className="textinput__button">
        {onSelectClick && <button onClick={onSelectClick}>Select</button>}
      </div>
    </div>
  );
};

export default TextInput;
