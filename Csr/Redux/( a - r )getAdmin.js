import { type } from "./types";

export const getAdminRequest = () => ({
  type: type.getAdminRequest,
});

export const getAdminSuccess = (payload) => ({
  type: type.getAdminSuccess,
  payload,
});

export const getAdminReject = () => ({
  type: type.getAdminReject,
});

const admin_permission = {
  access: false,
};

export const getAdminReducer = (state = admin_permission, action) => {
  switch (action.type) {
    case type.getAdminSuccess:
      return { ...state, access: true };
    case type.getAdminReject:
      return { ...state, access: false };
    default:
      return state;
  }
};
