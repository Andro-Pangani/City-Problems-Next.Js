import { type } from "../types";

export const refreshDeletingProcess = (payload) => {
  return {
    type: type.Delete.start_Deleting_Process,
  };
};

export const getDeletionRequest = (payload) => {
  return {
    type: type.Delete.get_Deletion_Request,
    payload,
  };
};

export const getDeletionSuccess = () => {
  return {
    type: type.Delete.get_Deletion_Success,
  };
};

export const getDeletionFailure = () => {
  return {
    type: type.Delete.get_Deletion_Failure,
  };
};

const delInitState = {
 refresh: false,
  deleting: false,
  deleted: false,
  failure: false,
 
};

export const getDeletionReducer = (state = delInitState, action) => {
  switch (action.type) {
    case type.Delete.start_Deleting_Process:
      return { ...state, startDeleting: true };

    case type.Delete.get_Deletion_Request:
      return { ...state, deleting: true };
    case type.Delete.get_Deletion_Success:
      return {
        ...state,
        deleting: false,
        deleted: true,
        refresh: false,
      
      };

    case type.Delete.get_Deletion_Failure:
      return {
        ...state,
        deleting: false,
        deleted: false,
        failure: true,
        refresh: false,
      };
    case type.Delete.start_Deleting_Process:
      return {
        ...delInitState,
      };
    default:
      return delInitState;
  }
};

export const getAdminMainDataToolsReducer = (state, action) => {
  switch (action.type) {
    case type.Delete.get_Deletion_Success:
      return { ...state };
  }
};

export const getVerificationRequest = (payload) => ({
  type: type.Verification.get_Verification_Request,
  payload,
});

export const getApproovingRequest = (payload) => ({
  type: type.Approove.get_Approoving_Request,
  payload,
});

export const getApproovingSuccess = (payload) => ({
  type: type.Approove.get_Approoving_Success,
  payload,
});
const initialState = [];
export const getApproovingReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.Approove.get_Approoving_Success:
      return action.payload;
    default:
      return state;
  }
};
