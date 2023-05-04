import { useReducer } from "react";
import GetApiContext from "./GetApiContext";
import GetApiReducer from "./GetApiReducer";
import { GET_PARAMS, URL_BUILDER, GET_QUOTES } from "../types";
import { BASE_URL } from "../../utils/baseUrl";

const GetApiState = ({ children }) => {
  const initialState = {
    params: {},
    url: "",
    quotes: {},
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

  const getQuotes = (quotes) => {
    dispatch({
      type: GET_QUOTES,
      payload: quotes,
    });
  };

  return (
    <GetApiContext.Provider
      value={{
        params: state.params,
        url: state.url,
        quotes: state.quotes,
        getParams,
        urlBuilder,
        getQuotes,
      }}
    >
      {children}
    </GetApiContext.Provider>
  );
};

export default GetApiState;
