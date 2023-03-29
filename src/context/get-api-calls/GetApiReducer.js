import { GET_PARAMS, URL_BUILDER } from "../types";

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
    default:
      return prevState;
  }
};

export default GetApiReducer;
