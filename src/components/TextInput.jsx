const TextInput = ({ placeholder, value, onChange, type }) => {
  return (
    <div className="textinput__container">
      <input onChange={onChange} value={value} type={type} />
      <div className="textinput__button">
        <button>Select</button>
      </div>
    </div>
  );
};

export default TextInput;
