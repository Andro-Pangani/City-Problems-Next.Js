import { type } from "../types";

// handles with uploadingMiddleware.js
export const getUploadingRequest = (payload) => ({
  type: type.Upload.get_Uploading_Request,
  payload,
});

export const getUploadingFailure = (payload) => ({
  type: type.Upload.get_Uploading_Failure,
  payload,
});

export const getUploadingFailureReducer = (state = false, action) => {
  switch (action.type) {
    case type.Upload.get_Uploading_Failure:
      return action.payload;
    default:
      return state;
  }
};

//  Uploading Section _
export const getUploadingSectionRequest = (payload) => ({
  type: type.Upload.getUploadingSectionRequest,
  payload,
});

export const getUploadingSectionRequestReducer = (state = false, action) => {
  if (action.type === type.Upload.getUploadingSectionRequest) {
    return action.payload;
  } else {
    return state;
  }
};
//  -  -  -

export const startUploadingProcess = (payload) => {
  return {
    type: type.Upload.startUploadingProcess,
    payload,
  };
};

export const stopUploadingProcess = () => {
  return {
    type: type.Upload.stopUploadingProcess,
  };
};

export const addNewAddress = (payload) => {
  return {
    type: type.Upload.addNewAddress,
    payload,
  };
};

export const clearNewItemAddress = () => ({
  type: type.Upload.clearNewItemAddress,
});

let newItemState = { address: undefined, coords: undefined };
export const addNewAddressReducer = (state = newItemState, action) => {
  switch (action.type) {
    case type.Upload.addNewAddress:
      console.log(" NEW ADDRESS REDUCER ", action.type);
      return action.payload;
    case type.Upload.clearNewItemAddress:
      return newItemState;
    default:
      return state;
  }
};

export const uploadingProcessReducer = (state = false, action) => {
  switch (action.type) {
    case type.Upload.startUploadingProcess:
      return true;
    case type.Upload.stopUploadingProcess:
      return false;
  }

  return state;
};

export const getUploadingSuccess = (payload) => ({
  type: type.Upload.get_Uploading_Success,
  payload,
});

export const getUploadingSuccessReducer = (state = false, action) => {
  switch (action.type) {
    case type.Upload.get_Uploading_Success:
      return action.payload;
    default:
      return false;
  }
};
