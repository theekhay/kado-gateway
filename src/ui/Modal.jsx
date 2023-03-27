import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ show, onClose, children, className}) => {
  return (
    <div className="vnin--container">
      {show && (
        <div className="vnin">
          <div className="vninclose">
            <AiOutlineCloseCircle
              onClick={onClose}
              size={22}
              cursor="pointer"
            />
          </div>
          <div className={`vnincontent ${className}`}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Modal;
