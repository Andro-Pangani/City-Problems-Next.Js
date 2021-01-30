import { type } from "./types";

export const getUnverifiedDataRequest = () => {
  return {
    type: type.getUnverified.DataRequest,
  };
};

export const getUnverifiedDataSuccess = (payload) => {
  console.log("############# unverified data action", payload);
  return {
    type: type.getUnverified.DataSuccess,
    payload,
  };
};

const initialState = {
  content: [],
};

export const getUnverifiedDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.getUnverified.DataSuccess:
      console.log("############# unverified data reducer", action.payload);

      return { content: action.payload };
    default:
      return state;
  }
};
