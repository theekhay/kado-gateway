import Button from "../components/Button";
import TextInput from "../components/TextInput";

const GateWay = () => {
  return (
    <div className="gateway__container">
      <div className="gateway__form">
        <TextInput placeholder="Amount in USD" type="text" />
        <TextInput placeholder="Amount in USD" type="text" />
        <TextInput placeholder="Amount in USD" type="text" />
        <Button buttonText="Ramp" />
      </div>
    </div>
  );
};

export default GateWay;
