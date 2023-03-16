import { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { networks } from "./data";

const AssetTab = ({ assetTab, setAssetTab, setSelectedAsset }) => {
  const [searchparam, setSearchParam] = useState("");

  const filteredAssets = networks.filter((network) =>
    network.name.toLowerCase().includes(searchparam.toLowerCase())
  );

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setAssetTab(false);
  };

  return (
    <div className="networktab__container">
      <div className="networktab--header">
        <h2>
          <span onClick={() => setAssetTab(!assetTab)}>
            <MdArrowBackIosNew size={16} />
          </span>
          Select Asset
        </h2>
      </div>
      <div className="searchinput">
        <input type="text" onChange={(e) => setSearchParam(e.target.value)} />
        <CiSearch size={20} />
      </div>
      <div className="networktab">
        {filteredAssets.map((network, idx) => (
          <div
            className="networktab--grid"
            key={idx}
            onClick={() => handleAssetSelect(network)}
          >
            <div className="networktab--grid--left">
              <div className="asset__format">
                <div className="asset__format--left">
                  <img src={network.icon} alt={network.symbol} />
                  {network.symbol}
                </div>
                <p>{network.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetTab;
