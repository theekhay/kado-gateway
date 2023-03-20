import { useState, useEffect, useLayoutEffect } from "react";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import NetworkTab from "../ui/NetworkTab";
import AssetTab from "../ui/AssetTab";
import Modal from "../ui/Modal";
import axios from "axios";

const GateWay = () => {
  const [networktab, setNetworkTab] = useState(false);
  const [assetTab, setAssetTab] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState({});
  const [selectedAsset, setSelectedAsset] = useState({});
  const [amountInUsd, setAmountInUsd] = useState(0);
  const [show, setShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const [statusModal, setStatusModal] = useState(false)
  const [statusRes, setStatusRes] = useState("")
  const [transactionMessage, setTransactionMessage] = useState("")
  const [transactionModal, setTransactionModal] = useState(false)

  useEffect(() => {
    const childResponse = async (e) => {
      if(e?.data) {
        console.log('e?.data', e?.data)
        try {
           const res = JSON.parse(e?.data)
           console.log('data parsed successfully....');
           //console.log(res?.__post_robot_10_0_46__?.map((el) => el.data))
           const result = res?.__post_robot_10_0_46__[0]?.data;
           const order_id = result.orderId
           console.log('order_id', order_id)
           if(order_id) {
            setTransactionModal(true)
            setTransactionMessage(`Fetching transaction status ...`)
            await new Promise((r) => setTimeout(r, 2000))

            axios.get(`https://dev-api.kado.money/v1/public/orders/${order_id}`)
            .then( async (res) => {
              if(res.status === 200) {
                await new Promise((r) => setTimeout(r, 2000))
                setStatusModal(true)
                setTransactionModal(false)
                // await new Promise((r) => setTimeout(r, 2000))
                setStatusRes(res?.data?.data?.transferStatus)
                setShow(false)
              } else return
            })
            .catch(err => console.error(err))
           } else return;
        } catch (error) {
          console.error('json parse error...');
        }
      }
    };

    console.log('log1');
    window.addEventListener("message", childResponse);
    console.log('log2');
    return () => window.removeEventListener("message", childResponse)
  })


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
    axios
      .get(
        `
      https://dev-api.kado.money/v1/ramp/quote?amountUsd=${amountInUsd}&blockchain=ethereum&asset=ETH&transactionType=buy&partner=prime_trust&fiatMethod=card`
      )

      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          setQuote(res.data.data.quote.receiveUnitCountAfterFees);
        } else {
          setQuote("No quote available");
        }
      })
      .catch((err) => setLoading(false));
  }, [amountInUsd]);

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
              prefix="Network"
            />
            <TextInput
              placeholder="Asset"
              type="text"
              disabled={true}
              onSelectClick={() => setAssetTab(true)}
              defaultValue={selectedAsset.symbol}
              iconUrl={selectedAsset.icon}
              prefix="Asset"
            />
            <TextInput
              placeholder="Amount in USD"
              type="number"
              onChange={handleAmountChange}
            />
            {loading ? <p>Fetching quotes...</p> : <p>{quote}</p>}
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
            src={ `http://localhost:3003/ramp?onPayCurrency=USD&onRevCurrency=${selectedNetwork.symbol}&offPayCurrency=${selectedNetwork.symbol}&offRevCurrency=USD&onPayAmount=${amountInUsd}&offPayAmount=1&network=ETHEREUM`}
              // src={`https://app.kado.money?onPayCurrency=USD&onRevCurrency=${selectedNetwork.symbol}&offPayCurrency=${selectedNetwork.symbol}&offRevCurrency=USD&onPayAmount=${amountInUsd}&offPayAmount=1&network=ETHEREUM`}
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
      {
        statusModal && (
          <div className="displaymodalcontent">
            <Modal show={statusModal} onClose={() => setStatusModal(false)}>
              <p>
                {statusRes}
              </p>
            </Modal>
          </div>
        )
      }
      {
        transactionModal && (
          <div className="displaymodalcontent">
            <Modal show={transactionModal} onClose={() => setTransactionModal(false)}>
              <p>{transactionMessage}</p>
            </Modal>
          </div>
        )
      }
    </>
  );
};

export default GateWay;
