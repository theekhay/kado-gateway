import { useState, useEffect, useContext } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import NetworkTab from "../ui/NetworkTab";
import AssetTab from "../ui/AssetTab";
import Modal from "../ui/Modal";
import axios from "axios";
import { FiCheckCircle } from "react-icons/fi";
import Loading from "../components/Loading";
import APIResponses from "./APIResponses";
import GetApiContext from "../context/get-api-calls/GetApiContext";
import { BASE_URL } from "../utils/baseUrl";

const GateWay = () => {
  const [networktab, setNetworkTab] = useState(false);
  const [assetTab, setAssetTab] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});
  const [amountInUsd, setAmountInUsd] = useState(0);
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [statusRes, setStatusRes] = useState("");
  const [transactionMessage, setTransactionMessage] = useState("");
  const [transactionModal, setTransactionModal] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [transactionType, setTransactionType] = useState("");

  const [networkAPIResponse, setNetworkAPIResponse] = useState("");
  const [assetAPIResponse, setAssetAPIResponse] = useState("");
  const [quoteAPIResponse, setQuoteAPIResponse] = useState("");

  const { urlBuilder, getQuotes, getParams } = useContext(GetApiContext);

  useEffect(() => {
    const childResponse = async (e) => {
      if (e?.data) {
        /*   console.log("e?.data", e?.data); */
        try {
          /* console.log("e?.data?.payload", e?.data?.payload); */
          const res = e?.data?.payload; // JSON.parse(e?.data?.payload)

          //  console.log('res: ', res);

          //  const result = res?.__post_robot_10_0_46__[0]?.data;
          const order_id = res?.orderId; // result.orderId

          if (order_id) {
            setShow(false);
            await new Promise((r) => setTimeout(r, 1000));

            setTransactionModal(true);
            setTransactionMessage(`Fetching transaction status ...`);
            await new Promise((r) => setTimeout(r, 2000));

            axios
              .get(`https://dev-api.kado.money/v1/public/orders/${order_id}`)
              .then(async (res) => {
                if (res.status === 200) {
                  await new Promise((r) => setTimeout(r, 2000));
                  setStatusModal(true);
                  setTransactionModal(false);
                  // await new Promise((r) => setTimeout(r, 2000))
                  setStatusRes(res?.data?.data?.transferStatus);
                  setShow(false);
                } else return;
              })
              .catch((err) => console.error(err));
          } else return;
        } catch (error) {
          console.error("json parse error...");
        }
      }
    };

    window.addEventListener("message", childResponse);
    return () => window.removeEventListener("message", childResponse);
  });

  // postRobot.send(window.parent, 'message', {
  //             message: 'message',
  //             orderId: 'res?.data?.data?.orderId'
  //           })

  // postRobot.on('getUser', { domain: 'http://localhost' }, function(event) {

  //     console.log("consuming message from window  ....");
  // });

  // const getStatusResponse = async () => {
  //   const res = await axios.get(
  //     "https://dev-api.kado.money/v1/public/orders/6408fd3e24c501549aaac9fd"
  //   );
  //   /* console.log(res) */
  //   setTimeout(() => {
  //     /* setShowModal(false); */
  //   }, 1000);
  //   if (res.status === 200) {
  //     console.log("sending message to parent window....");
  //     postRobot.send(window.parent, "message", {
  //       message: res?.data?.data?.transferStatus,
  //       orderId: res?.data?.data?.orderId,
  //     });

  //     //receiver
  //     postRobot.on("message", async (event) => {
  //       console.log("consuming message from window  ....");
  //       await new Promise((r) => setTimeout(r, 2000));
  //       /*  setTransactionModal(true); */

  //       if (event.data.message === "settled") {
  //         /*  setTransactionMessage(`Fetching transaction status ...`); */
  //         // setTimeout(() => {
  //         axios
  //           .get(
  //             "https://dev-api.kado.money/v1/public/orders/6408fd3e24c501549aaac9fd"
  //           )
  //           .then(async (res) => {
  //             if (res.status === 200) {
  //               await new Promise((r) => setTimeout(r, 2000));
  //               /*  setTransactionMessage(res.data.data.transferStatus); */
  //             }
  //           })
  //           .catch((err) => console.log(err));
  //         // })
  //       } else console.log("failed");
  //     });
  //   } else return;
  // };

  const handleAmountChange = (e) => {
    setAmountInUsd(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const url = `https://dev-api.kado.money/v1/ramp/quote?amountUsd=${amountInUsd}&blockchain=ethereum&asset=ETH&transactionType=buy&partner=prime_trust&fiatMethod=card`;
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setQuote(res.data.data.quote.receiveUnitCountAfterFees);
          setQuoteAPIResponse(res.data.data.quote);
          getQuotes(res.data.data.quote);
          getParams({
            blockchains: res.data.data.quote,
            api: url,
            status: res.status,
          });
        } else {
          setQuote("No quote available");
        }
      })
      .catch((err) => setLoading(false));
  }, [amountInUsd]);

  useEffect(() => {
    if (selectedNetwork && amountInUsd && email && transactionType && address) {
      urlBuilder(
        selectedNetwork.network,
        amountInUsd,
        address,
        email,
        transactionType
      );
    } else return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork, amountInUsd, email, transactionType, address]);

  return (
    <div className="gatewaylayout">
      <div className="gatewaylayout--left">
        {!networktab && !assetTab && (
          <div className="gateway__container">
            <div className="gateway__form">
              <TextInput
                placeholder="Network"
                type="text"
                disabled={true}
                onSelectClick={() => setNetworkTab(true)}
                defaultValue={
                  selectedNetwork.network
                    ? selectedNetwork.network.charAt(0).toUpperCase() +
                      selectedNetwork.network.slice(1).toLowerCase()
                    : selectedNetwork.network
                }
                iconUrl={selectedNetwork.icon}
                prefix="Network"
              />
              <TextInput
                placeholder={
                  Object.keys(selectedNetwork).length === 0
                    ? "Select a nework to view assets"
                    : "Assets"
                }
                type="text"
                disabled={true}
                onSelectClick={() => setAssetTab(true)}
                defaultValue={selectedAsset.name}
                iconUrl={selectedAsset.icon}
                prefix="Asset"
                locked={Object.keys(selectedNetwork).length === 0}
              />
              <TextInput
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextInput
                placeholder="Wallet Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextInput
                placeholder="Amount in USD"
                type="number"
                onChange={handleAmountChange}
              />
              <select onChange={(e) => setTransactionType(e.target.value)}>
                <option>Mode</option>
                <option value="minimal">Minimal</option>
                <option value="full">Full</option>
              </select>
              {loading ? (
                <p style={{ color: "#fff" }}>Fetching quotes...</p>
              ) : (
                <p style={{ color: "#fff" }}>{quote}</p>
              )}
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
            setNetworkAPIResponse={setNetworkAPIResponse}
          />
        )}
        {assetTab && (
          <AssetTab
            setAssetTab={setAssetTab}
            assetTab={assetTab}
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            setAssetAPIResponse={setAssetAPIResponse}
            associatedAssets={
              selectedNetwork.associatedAssets &&
              selectedNetwork.associatedAssets
            }
          />
        )}
        {show && (
          <div className="displaymodalcontent">
            <Modal show={show} onClose={() => setShow(false)}>
              <iframe
                //src={`http://localhost:3003/ramp?onPayCurrency=USD&onRevCurrency=${selectedNetwork.network}&offPayCurrency=${selectedNetwork.network}&offRevCurrency=USD&onPayAmount=${amountInUsd}&offPayAmount=1&network=ETHEREUM?isIntegratorMode=true`}
                src={`${BASE_URL}?product=BUY&network=${selectedNetwork.origin}&step=summary&onToAddress=${address}&onPayAmount=${amountInUsd}&cryptoList=USDC&fiatList=USD,CAD,GBP,EUR,MXN,COP&productList=BUY&onPayCurrency=${selectedNetwork.network}&onRevCurrency=${selectedAsset.symbol}&email=${email}&mode=${transactionType}`}
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
        {statusModal && (
          <div className="displaymodalcontent">
            <Modal
              show={statusModal}
              onClose={() => setStatusModal(false)}
              className="dialogModal"
            >
              <div className="transactionstatus">
                <FiCheckCircle size={50} color="green" />
                <p>{statusRes}</p>
              </div>
            </Modal>
          </div>
        )}
        {transactionModal && (
          <div className="displaymodalcontent">
            <Modal
              show={transactionModal}
              onClose={() => setTransactionModal(false)}
              className="dialogModal"
            >
              <div className="transactionconfirm">
                <Loading />
                <p>{transactionMessage}</p>
              </div>
            </Modal>
          </div>
        )}
      </div>
      <div className="gatewaylayout--right">
        <APIResponses
          networkAPIResponse={networkAPIResponse}
          assetAPIResponse={assetAPIResponse}
          quoteAPIResponse={quoteAPIResponse}
        />
      </div>
    </div>
  );
};

export default GateWay;
