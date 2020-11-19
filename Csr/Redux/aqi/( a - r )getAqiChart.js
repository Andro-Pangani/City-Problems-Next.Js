import { type } from "../types";

export const getSetAqiChartData = (payload) => {
  return {
    type: type.Aqi.Chart.get_SetAqiChartData,
    payload,
  };
};

const initialState = {
  data: [],
  active: false,
};

export const setAqiChartDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.Aqi.Chart.get_SetAqiChartData:
      return action.payload;
    default:
      return state;
  }
};
