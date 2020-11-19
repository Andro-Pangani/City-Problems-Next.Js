import { type } from "../types";

export const getMobileMenuClicked = (payload) => {
  return {
    type: type.Mobile.Menu_Button_Clicked,
    payload,
  };
};

export const mobileMenuStateReducer = (state = false, action) => {
  if (action.type === type.Mobile.Menu_Button_Clicked) {
    return action.payload;
  }
  return state;
};

export const setMobileMode = () => {
  return {
    type: type.Mobile.set_Mobile_Mode,
  };
};

const initialState = false;

export const mobileModeReducr = (state = initialState, action) => {
  switch (action.type) {
    case type.Mobile.set_Mobile_Mode:
      return true;
    default:
      return state;
  }
};

// when clicked nav menu item in mobile mode
export const setMobileNavItemClicked = (payload) => {
  console.log("<<<<<< nav item clicked action >>>>>>>>>>");
  return {
    type: type.Mobile.nav_Item_Clicked,
    payload,
  };
};

export const mobileNavItemClickedReducer = (state = false, action) => {
  switch (action.type) {
    case type.Mobile.nav_Item_Clicked:
      return action.payload;
    default:
      return state;
  }
};

// WHEN CLICKED SHOW ON MAP IN MOBILE MODE

export const setMobileShowOnMapClicked = (payload) => {
  return {
    type: type.Mobile.showOnMapClicked,
    payload,
  };
};

export const showOnMapClickedReducer = (state = false, action) => {
  switch (action.type) {
    case type.Mobile.showOnMapClicked:
      return action.payload;
    default:
      return state;
  }
};

// WHEN CLICKED MAP ADDRESS LIST ITEM FROM UPLOADING MODE

export const setUploadAddressFromMap = (payload) => {
  console.log(" UPLOAD ADDRESS FROM MAP");
  return {
    type: type.Mobile.upload.addressFromMap,
    payload,
  };
};

export const uploadAddressFromMap = (state = false, action) => {
  switch (action.type) {
    case type.Mobile.upload.addressFromMap:
      return action.payload;
    default:
      return state;
  }
};
