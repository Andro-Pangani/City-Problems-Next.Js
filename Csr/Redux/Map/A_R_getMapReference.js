import { type } from "../types";


/// -       -   -   MAP  -  REFERENCE  -

export const getMapReferenceRequest = (payload) => {
  return { type: type.Map.getMapReferenceRequest, payload };
};

export const setMapReferenceToState = (payload) => {
  return {
    type: type.Map.setMapReferenceToState,
    payload,
  };
};

export const getMapReferenceReducer = (state = [], action) => {
  switch (action.type) {
    case type.Map.setMapReferenceToState:
      return action.payload;
    default:
      return state;
  }
};

// -      -  -    -  ADD MARKERS TO STORE - -  -  

export const setMarkersToStoreRequest = (payload) => ({
  type: type.Map.setMarkersToStoreRequest,
  payload,
});

export const setMarkersToStoreReducer = (state = [], action) => {
  switch (action.type) {
    case type.Map.setMarkersToStoreRequest:
      return [...state, ...[action.payload]];
    default:
      return state;
  }
};

export const setAqiMarkersToStore = (payload) => {
 return {
  type: type.Map.setAqiMarkersToStore,
  payload
 }
}

export const aqiMarkersOnMapReducer = (state = [], action) => {
 switch(action.type){
  case type.Map.setAqiMarkersToStore:
   return [...action.payload];
  default: return state;
 }
}
