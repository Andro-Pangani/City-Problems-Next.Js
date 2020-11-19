import { type } from "../types";

export const getScrollContentRequest = (payload) => {
  return {
    type: type.Scroll.getContentRequest,
    payload,
  };
};

export const getScrollContentSuccess = (payload) => {
  return {
    type: type.Scroll.getContentSuccess,
    payload,
  };
};
