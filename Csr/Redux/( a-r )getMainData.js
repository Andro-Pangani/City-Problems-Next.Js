import { type } from "./types";

export const getMainDataRequest = (payload) => ({
  type: type.getMainDataRequest,
  payload,
});

export const getMainDataSuccess = (payload) => ({
  type: type.getMainDataSuccess,
  payload,
});

export const getMainDataFailure = (payload) => ({
  type: type.getMainDataFailure,
  payload,
});

const main_content = {
  content: [],
  fromScroll: null,
  lastSnapshot: null,
  isLoading: false,
  isError: false,
  scrollIsLoading: false,
};

export const getMainDataReducer = (state = main_content, action) => {
  switch (action.type) {
    case type.getMainDataRequest:
      return { ...state, isLoading: true };
    case type.getMainDataSuccess:
      return {
        ...state,
        content: action.payload.content,
        lastSnapshot: action.payload.lastSnapshot,
        isLoading: false,
      };
    case type.Scroll.getContentSuccess:
      return {
        ...state,
        content: [...state.content, ...action.payload.content],
        lastSnapshot: action.payload.lastSnapshot,

        fromScroll: null,
      };
    case type.getMainDataFailure:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};
