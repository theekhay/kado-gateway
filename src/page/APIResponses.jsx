import { useContext } from "react";
import GetApiContext from "../context/get-api-calls/GetApiContext";

const APIResponses = () => {
  const { params } = useContext(GetApiContext);

  console.log(params.blockchains);
  return (
    <div className="apiresponses__container">
      <div className="apiresponse__header">
        <h4>Network Responses</h4>
      </div>
      {params && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>
              <span
                style={{
                  fontWeight: "800",
                }}
              >
                API CALL :{" "}
              </span>
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "green",
                }}
              >
                {params.api}
              </span>
            </h4>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(params.blockchains, null, 2)}</pre>
          </div>
        </div>
      )}
      {/*  {quoteAPIResponse && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>Quote Response</h4>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(quoteAPIResponse, null, 2)}</pre>
          </div>
        </div>
      )} */}
      {/* {quoteAPIResponse && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>Quote Response</h4>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(quoteAPIResponse, null, 2)}</pre>
          </div>
        </div>
      )}
      {selectedNetwork && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>Selected Network</h4>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(selectedNetwork, null, 2)}</pre>
          </div>
        </div>
      )}
      <div className="apiresponse-data">
        <div className="apiresponse__header">
          <h4>Network Responses</h4>
        </div>
        {networkAPIResponse && (
          <div className="apiresponse-print">
            <pre>{JSON.stringify(networkAPIResponse, null, 2)}</pre>
          </div>
        )}
      </div>
      {selectedAsset && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>Selected Asset</h4>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(selectedAsset, null, 2)}</pre>
          </div>
        </div>
      )}
      <div className="apiresponse-data">
        <div className="apiresponse__header">
          <h4>Assets Responses</h4>
        </div>
        {assetAPIResponse && (
          <div className="apiresponse-print">
            <pre>{JSON.stringify(assetAPIResponse, null, 2)}</pre>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default APIResponses;
