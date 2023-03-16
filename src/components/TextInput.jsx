const TextInput = ({
  placeholder,
  defaultValue,
  onChange,
  type,
  disabled,
  value,
  onSelectClick,
  iconUrl,
}) => {
  return (
    <div className="textinput__container">
      <div className="iconappended">
        {iconUrl && <img src={iconUrl} alt="icon" />}
      </div>
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
