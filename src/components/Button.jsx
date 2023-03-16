const Button = ({ buttonText, onClick, disabled }) => {
  return (
    <div className="button__container">
      <button onClick={onClick} disabled={disabled}>
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
