import { useState, useLayoutEffect } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axios from "axios";

const AssetTab = ({
  assetTab,
  setAssetTab,
  setSelectedAsset,
  setAssetAPIResponse,
}) => {
  const [searchparam, setSearchParam] = useState("");
  const [assets, setAssets] = useState("");

  const filteredAssets =
    assets &&
    assets.filter((network) =>
      network.name.toLowerCase().includes(searchparam.toLowerCase())
    );

  useLayoutEffect(() => {
    const asset = async () => {
      const res = await axios.get(
        "https://dev-api.kado.money/v1/ramp/supported-assets"
      );
      if (res.status === 200) {
        setAssets(res?.data?.data?.assets);
        setAssetAPIResponse(res?.data?.data?.assets);
      } else {
        console.log(res);
        setAssets("No data");
      }
    };

    asset();
  }, []);

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
        {filteredAssets &&
          filteredAssets.map((network, idx) => (
            <div
              className="networktab--grid"
              key={idx}
              onClick={() => handleAssetSelect(network)}
            >
              <div className="networktab--grid--left">
                <div className="asset__format">
                  <div className="asset__format--left">
                    {/*  <img src={network.icon} alt={network.symbol} /> */}
                    {network.name}
                  </div>
                  {/* <p>{network.name}</p> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AssetTab;
