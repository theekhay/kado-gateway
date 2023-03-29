import { useContext } from "react";
import GetApiContext from "../context/get-api-calls/GetApiContext";

const APIResponses = () => {
  const { params, url } = useContext(GetApiContext);

  console.log(url);
  return (
    <div className="apiresponses__container">
      <div className="apiresponse__header">
        <h4>Network Responses</h4>
      </div>
      {Object.keys(params).length !== 0 && (
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
            <h5>
              API STATUS :{" "}
              {params.status === 200 ? (
                <span style={{ color: "green", fontWeight: "bolder" }}>
                  {params.status} (OK)
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bolder" }}>
                  {params.status} (ERROR)
                </span>
              )}
            </h5>
          </div>
          <div className="apiresponse-print">
            <pre>{JSON.stringify(params.blockchains, null, 2)}</pre>
          </div>
        </div>
      )}
      {url && (
        <div className="apiresponse-data">
          <div className="apiresponse__header">
            <h4>
              <span
                style={{
                  fontWeight: "800",
                }}
              >
                URL BUILDER :{" "}
              </span>
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "green",
                  wordBreak: "break-all",
                }}
              >
                {url}
              </span>
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default APIResponses;
