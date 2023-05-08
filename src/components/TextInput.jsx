const TextInput = ({
  placeholder,
  defaultValue,
  onChange,
  type,
  disabled,
  value,
  onSelectClick,
  iconUrl,
  prefix,
  onBlur,
  locked,
}) => {
  return (
    <div className="textinput__container">
      <div className="textinput__prefix">{<span>{prefix}</span>}</div>
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
        style={{
          paddingLeft: prefix ? "7rem" : "0.5rem",
          zIndex: "1",
        }}
        onBlur={onBlur}
      />
      <div className="textinput__button">
        {onSelectClick && (
          <button onClick={onSelectClick} disabled={locked}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
