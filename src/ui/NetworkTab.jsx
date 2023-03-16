import { MdArrowBackIosNew } from "react-icons/md";
import { networks } from "./data";

const NetworkTab = ({
  networktab,
  setNetworkTab,
  selectedNetwork,
  setSelectedNetwork,
}) => {
  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    setNetworkTab(false);
  };
  return (
    <div className="networktab__container">
      <div className="networktab--header">
        <h2>
          <span onClick={() => setNetworkTab(!networktab)}>
            <MdArrowBackIosNew size={16} />
          </span>
          Network
        </h2>
        <h3>Selected USDC</h3>
      </div>
      <p>Select the network you would like to send assets on.</p>
      <div className="networktab">
        {networks.map((network, idx) => (
          <div
            className="networktab--grid"
            key={idx}
            onClick={() => handleNetworkSelect(network)}
          >
            <div className="networktab--grid--left">
              <img src={network.icon} alt={network.name} />
              {network.name}
            </div>
            <div className="networktab--grid--right">
              <p>Time</p> <span>~{network.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NetworkTab;
