import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import { useState, useLayoutEffect } from "react";

const NetworkTab = ({ networktab, setNetworkTab, setSelectedNetwork }) => {
  const [blockchains, setBlockchains] = useState("");

  useLayoutEffect(() => {
    const blocks = async () => {
      const res = await axios.get(
        "https://dev-api.kado.money/v1/ramp/blockchains"
      );
      if (res.status === 200) {
        setBlockchains(res?.data?.data?.blockchains);
      } else {
        console.log(res);
        setBlockchains("No data");
      }
    };
    blocks();
  }, []);

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
        {blockchains &&
          blockchains.map((network, idx) => (
            <div
              className="networktab--grid"
              key={idx}
              onClick={() => handleNetworkSelect(network)}
            >
              <div className="networktab--grid--left">
                {/*  <img src={network.icon} alt={network.name} /> */}
                {network.network.charAt(0).toUpperCase() +
                  network.network.slice(1).toLowerCase()}
              </div>
              <div className="networktab--grid--right">
                <p>Time</p> <span>~{network.avgTransactionTimeSeconds}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NetworkTab;
