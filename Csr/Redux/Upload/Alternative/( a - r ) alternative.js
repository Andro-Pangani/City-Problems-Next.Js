import { type } from "../../types";

export const getAlternativeUploadingRequest = (payload) => ({
  type: type.Upload.alternative.getUploadingRequest,
  payload,
});

export const getAlternativeUploadingSuccess = () => ({
  type: type.Upload.alternative.getUploadingSuccess,
});

export const getAltenativeUploadingFailure = () => ({
  type: type.Upload.alternative.getUploadingFailure,
});

export const getAlternativeUploadingRefresh = () => ({
  type: type.Upload.alternative.getUploadingRefresh,
});

export const alternativeUploadingReducer = (
  state = {
    uploading: false,
    uploaded: false,
    failure: false,
  },
  action
) => {
  switch (action.type) {
    case type.Upload.alternative.getUploadingRequest:
      return { ...state, uploading: true };
    case type.Upload.alternative.getUploadingSuccess:
      return { ...state, uploaded: true, uploading: false };
    case type.Upload.alternative.getUploadingFailure:
      return { ...state, failure: true, uploading: false, uploaded: false };
    case type.Upload.alternative.getUploadingRefresh:
      return { ...state, uploaded: false };
    default:
      return state;
  }
};
