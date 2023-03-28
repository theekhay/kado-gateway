import { GET_PARAMS } from "../types";

const GetApiReducer = (prevState, { type, payload }) => {
  switch (type) {
    case GET_PARAMS:
      return {
        ...prevState,
        params: payload,
      };
    default:
      return prevState;
  }
};

export default GetApiReducer;
