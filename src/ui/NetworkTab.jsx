import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import { useState, useLayoutEffect, useContext } from "react";
import GetApiContext from "../context/get-api-calls/GetApiContext";
import Spinner from "../components/Spinner";

const NetworkTab = ({ networktab, setNetworkTab, setSelectedNetwork }) => {
  const [blockchains, setBlockchains] = useState("");
  const { getParams } = useContext(GetApiContext);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const blocks = async () => {
      const res = await axios.get(
        "https://dev-api.kado.money/v1/ramp/blockchains"
      );
      if (res.status === 200) {
        setLoading(false);
        setBlockchains(res?.data?.data?.blockchains);
        getParams({
          blockchains: res?.data?.data?.blockchains,
          api: "https://dev-api.kado.money/v1/ramp/blockchains",
          status: res.status,
        });
      } else {
        setLoading(false);
        setBlockchains("No data");
        getParams({
          blockchains: "No data",
          api: "https://dev-api.kado.money/v1/ramp/blockchains",
          status: res.status,
        });
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
      {loading && (
        <div className="networktab--spinner">
          <Spinner />
        </div>
      )}
      {!loading && (
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
      )}
    </div>
  );
};

export default NetworkTab;
