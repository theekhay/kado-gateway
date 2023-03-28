import { useState, useLayoutEffect, useContext } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Spinner from "../components/Spinner";
import GetApiContext from "../context/get-api-calls/GetApiContext";

const AssetTab = ({ assetTab, setAssetTab, setSelectedAsset }) => {
  const [searchparam, setSearchParam] = useState("");
  const [assets, setAssets] = useState("");
  const [loading, setLoading] = useState(true);
  const { getParams } = useContext(GetApiContext);

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
        setLoading(false);
        setAssets(res?.data?.data?.assets);
        getParams({
          blockchains: res?.data?.data?.assets,
          api: "https://dev-api.kado.money/v1/ramp/supported-assets",
          status: res.status,
        });
      } else {
        setLoading(false);
        setAssets("No data");
        getParams({
          blockchains: "No data",
          api: "https://dev-api.kado.money/v1/ramp/supported-assets",
          status: res.status,
        });
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
        <CiSearch size={20} color="white" />
      </div>
      {loading && (
        <div className="networktab--spinner">
          <Spinner />
        </div>
      )}
      {!loading && (
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
      )}
    </div>
  );
};

export default AssetTab;
