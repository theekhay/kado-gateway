import { useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import NetworkTab from "../ui/NetworkTab";
import AssetTab from "../ui/AssetTab";

const GateWay = () => {
  const [networktab, setNetworkTab] = useState(false);
  const [assetTab, setAssetTab] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});

  return (
    <>
      {!networktab && !assetTab && (
        <div className="gateway__container">
          <div className="gateway__form">
            <TextInput
              placeholder="Network"
              type="text"
              disabled={true}
              onSelectClick={() => setNetworkTab(true)}
              defaultValue={selectedNetwork.name}
            />
            <TextInput
              placeholder="Asset"
              type="text"
              disabled={true}
              onSelectClick={() => setAssetTab(true)}
              defaultValue={selectedAsset.name}
            />
            <TextInput placeholder="Amount in USD" type="text" />
            <Button buttonText="Ramp" />
          </div>
        </div>
      )}
      {networktab && (
        <NetworkTab
          setNetworkTab={setNetworkTab}
          networktab={networktab}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
        />
      )}
      {assetTab && (
        <AssetTab
          setAssetTab={setAssetTab}
          assetTab={assetTab}
          selectedAsset={selectedAsset}
          setSelectedAsset={setSelectedAsset}
        />
      )}
    </>
  );
};

export default GateWay;
