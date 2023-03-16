const Button = ({ buttonText, onClick }) => {
  return (
    <div className="button__container">
      <button onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default Button;
