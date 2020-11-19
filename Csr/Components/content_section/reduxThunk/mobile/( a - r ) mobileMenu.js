import { type } from "../../../../Redux/types";

export const setMobileTabIndex = (payload) => ({
  type: type.Mobile.Set_Mobile_Menu_Tab_Index,
  payload,
});

const initialState = null;
export const MobileMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.Mobile.Set_Mobile_Menu_Tab_Index:
      return action.payload;
    default:
      return state;
  }
};
