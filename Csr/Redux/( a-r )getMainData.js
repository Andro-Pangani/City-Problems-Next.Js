import { type } from "./types";

export const getMainDataRequest = (payload) => ({
  type: type.getMainDataRequest,
  payload,
});

export const getMainDataRequestPush = (payload) => ({
  type: type.getMainDataRequestPush,
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
  prevSnapshot: null,
  isLoading: false,
  isError: false,
  scrollIsLoading: false,
  length: 0,
  docId: null,
  logged: undefined,
};

export const getMainDataReducer = (state = main_content, action) => {
  switch (action.type) {
    case type.getMainDataRequest:
      return { ...state, isLoading: true };

    case type.getMainDataSuccess:
      return {
        ...state,
        content: [...state.content, ...action.payload.content],
        lastSnapshot: action.payload.lastSnapshot,
        prevSnapshot: action.payload.prevSnapshot,
        isLoading: false,
        length: action.payload.length,
        docId: action.payload.docId,
        logged: action.payload.logged,
      };

    case type.getMainDataRequestPush:
      return {
        ...state,
        content: action.payload.content,
        lastSnapshot: action.payload.lastSnapshot,
        prevSnapshot: action.payload.prevSnapshot,
        isLoading: false,
        length: action.payload.length,
        docId: action.payload.docId,
      };
    case type.getLastSnapshotRefresh:
      return {
        ...state,
        lastSnapshot: action.payload,
      };

    case type.Scroll.getContentSuccess:
      return {
        ...state,
        content: [...state.content, ...action.payload.content],
        lastSnapshot: action.payload.lastSnapshot,
        prevSnapshot: action.payload.prevSnapshot,
        docId: action.payload.docId,
        fromScroll: null,
        length: action.payload.length,
      };
    case type.getMainDataFailure:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};
