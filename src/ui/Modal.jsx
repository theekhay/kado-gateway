import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ show, onClose, children }) => {
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
          <div className="vnincontent">{children}</div>
        </div>
      )}
    </div>
  );
};

export default Modal;
