import { GET_PARAMS, URL_BUILDER, GET_QUOTES } from "../types";

const GetApiReducer = (prevState, { type, payload }) => {
  switch (type) {
    case GET_PARAMS:
      return {
        ...prevState,
        params: payload,
      };
    case URL_BUILDER:
      return {
        ...prevState,
        url: payload,
      };
    case GET_QUOTES:
      return {
        ...prevState,
        quotes: payload,
      };
    default:
      return prevState;
  }
};

export default GetApiReducer;
