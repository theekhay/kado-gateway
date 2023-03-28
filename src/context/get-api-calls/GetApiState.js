import { useReducer } from "react";
import GetApiContext from "./GetApiContext";
import GetApiReducer from "./GetApiReducer";
import { GET_PARAMS } from "../types";

const GetApiState = ({ children }) => {
  const initialState = {
    params: {},
  };

  const [state, dispatch] = useReducer(GetApiReducer, initialState);

  const getParams = (params) => {
    dispatch({
      type: GET_PARAMS,
      payload: params,
    });
  };

  return (
    <GetApiContext.Provider
      value={{
        params: state.params,
        getParams,
      }}
    >
      {children}
    </GetApiContext.Provider>
  );
};

export default GetApiState;
