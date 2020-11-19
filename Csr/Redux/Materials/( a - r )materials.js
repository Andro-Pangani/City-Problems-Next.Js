const { type } = require("../types");

// Click on Marker => get Single Case
export const getDataByMarker = (payload) => {
  return {
    type: type.Map.getDataByMarker,
    payload,
  };
};

export const setMaterialDataRequest = (payload) => ({
  type: type.Material.getMaterialDataRequest,
  payload,
});

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
};

export const setMaterialDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.Material.getMaterialDataRequest:
      return action.payload;
    case type.Map.getDataByMarker:
      return action.payload;
    default:
      return state;
  }
};
