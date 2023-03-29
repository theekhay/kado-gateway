import { useReducer } from "react";
import GetApiContext from "./GetApiContext";
import GetApiReducer from "./GetApiReducer";
import { GET_PARAMS, URL_BUILDER } from "../types";
import { BASE_URL } from "../../utils/baseUrl";

const GetApiState = ({ children }) => {
  const initialState = {
    params: {},
    url: "",
  };

  const [state, dispatch] = useReducer(GetApiReducer, initialState);

  const getParams = (params) => {
    dispatch({
      type: GET_PARAMS,
      payload: params,
    });
  };

  const urlBuilder = (currency, amount) => {
    dispatch({
      type: URL_BUILDER,
      payload: `${BASE_URL}?onPayCurrency=USD&onRevCurrency=${currency}&offPayCurrency=${currency}&offRevCurrency=USD&onPayAmount=${amount}&offPayAmount=1&network=ETHEREUM?isIntegratorMode=true`,
    });
  };

  return (
    <GetApiContext.Provider
      value={{
        params: state.params,
        url: state.url,
        getParams,
        urlBuilder,
      }}
    >
      {children}
    </GetApiContext.Provider>
  );
};

export default GetApiState;
