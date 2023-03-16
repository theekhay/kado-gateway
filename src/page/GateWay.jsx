import { useState } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import NetworkTab from "../ui/NetworkTab";
import AssetTab from "../ui/AssetTab";
import Modal from "../ui/Modal";
import postRobot from "post-robot";
import axios from "axios";

const GateWay = () => {
  const [networktab, setNetworkTab] = useState(false);
  const [assetTab, setAssetTab] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});
  const [amountInUsd, setAmountInUsd] = useState(0);
  const [show, setShow] = useState(false);

  const getStatusResponse = async () => {
    const res = await axios.get(
      "https://dev-api.kado.money/v1/public/orders/6408fd3e24c501549aaac9fd"
    );
    /* console.log(res) */
    setTimeout(() => {
      /* setShowModal(false); */
    }, 1000);
    if (res.status === 200) {
      console.log("sending message to parent window....");
      postRobot.send(window.parent, "message", {
        message: res?.data?.data?.transferStatus,
        orderId: res?.data?.data?.orderId,
      });

      //receiver
      postRobot.on("message", async (event) => {
        console.log("consuming message from window  ....");
        await new Promise((r) => setTimeout(r, 2000));
        /*  setTransactionModal(true); */

        if (event.data.message === "settled") {
          /*  setTransactionMessage(`Fetching transaction status ...`); */
          // setTimeout(() => {
          axios
            .get(
              "https://dev-api.kado.money/v1/public/orders/6408fd3e24c501549aaac9fd"
            )
            .then(async (res) => {
              if (res.status === 200) {
                await new Promise((r) => setTimeout(r, 2000));
                /*  setTransactionMessage(res.data.data.transferStatus); */
              }
            })
            .catch((err) => console.log(err));
          // })
        } else console.log("failed");
      });
    } else return;
  };

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
              iconUrl={selectedNetwork.icon}
            />
            <TextInput
              placeholder="Asset"
              type="text"
              disabled={true}
              onSelectClick={() => setAssetTab(true)}
              defaultValue={selectedAsset.name}
              iconUrl={selectedAsset.icon}
            />
            <TextInput
              placeholder="Amount in USD"
              type="number"
              onChange={(e) => setAmountInUsd(e.target.value)}
            />
            <Button buttonText="Ramp" onClick={() => setShow(true)} />
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
      {show && (
        <div className="displaymodalcontent">
          <Modal show={show} onClose={() => setShow(false)}>
            <iframe
              src={`https://app.kado.money?onPayCurrency=USD&onRevCurrency=${selectedNetwork.symbol}&offPayCurrency=${selectedNetwork.symbol}&offRevCurrency=USD&onPayAmount=${amountInUsd}&offPayAmount=1&network=ETHEREUM`}
              style={{
                overflow: "auto",
                height: "100%",
                width: "100%",
                border: "none",
              }}
              title="Kado"
            />
          </Modal>
        </div>
      )}
    </>
  );
};

export default GateWay;
