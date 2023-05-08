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

  const urlBuilder = (currency, amount, address, email, mode) => {
    dispatch({
      type: URL_BUILDER,
      //payload: `${BASE_URL}?onPayCurrency=USD&onRevCurrency=${currency}&offPayCurrency=${currency}&offRevCurrency=USD&onPayAmount=${amount}&offPayAmount=1&network=ETHEREUM?isIntegratorMode=true`,
      payload: `${BASE_URL}?product=BUY&network=optimism&step=summary&onToAddress=${address}&onPayAmount=${amount}&cryptoList=USDC&fiatList=USD,CAD,GBP,EUR,MXN,COP&productList=BUY&onPayCurrency=${currency}&onRevCurrency=${currency}&email=${email}&mode=${mode}`,
    });
  };

  //https://widget-v2--kado.netlify.app/?product=BUY&network=optimism&step=summary&onToAddress=0x294819aa6fbdd12Dd7D6cfca38379Fe3a0c4E38C&onPayAmount=5&cryptoList=USDC&fiatList=USD,CAD,GBP,EUR,MXN,COP&productList=BUY&onPayCurrency=USD&onRevCurrency=USDC&email=andre@kado.money&mode=minimal

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
