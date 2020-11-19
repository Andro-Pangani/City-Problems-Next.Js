import { type } from "../types";

export const getAqiRequest = () => {
  return {
    type: type.Aqi.get_Aqi_Request,
  };
};

export const getAqiSuccess = (payload) => {
  return { type: type.Aqi.get_Aqi_Success, payload };
};

export const getAqiFailure = (payload) => {
  return {
    type: type.Aqi.get_Aqi_Failure,
    payload,
  };
};

const initialState = {
  data: [],
};

export const getAqiReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.Aqi.get_Aqi_Success:
      return { ...state, ...{ data: action.payload } };
    default:
      return state;
  }
};

export const getChartDataRequest = (payload) => {
  return {
    type: type.Aqi.Chart.get_Chart_Data_Request,
    payload,
  };
};

export const getChartDataReducer = (state = [], action) => {
  switch (action.type) {
    case type.Aqi.Chart.get_Chart_Data_Request:
      return action.payload;
    default:
      return state;
  }
};

export const setAqiCityDataRequest = (payload) => {
  return {
    type: type.Aqi.set_City_Data_Request,
    payload,
  };
};

export const setAqiCityDataSuccess = (payload) => {
  return {
    type: type.Aqi.set_City_Data_Success,
    payload,
  };
};

export const setAqiCityDataFailure = (payload) => {
  return {
    type: type.Aqi.set_City_data_Failure,
    payload,
  };
};

const cityState = {
  dataState: {
    isLoading: false,
    isLoaded: false,
    isError: false,
  },
  data: [],
};

export const setAqiCityDataReducer = (state = cityState, action) => {
  switch (action.type) {
    case type.Aqi.get_Aqi_Request:
      return {
        ...state,
        dataState: { isLoading: true, isLoaded: false, isError: false },
        data: action.payload,
      };

    case type.Aqi.set_City_Data_Success:
      return {
        ...state,
        dataState: {
          isLoading: false,
          isLoaded: true,
          isError: false,
        },
        data: action.payload,
      };
    case type.Aqi.get_Aqi_Failure:
      return {
        ...state,
        dataState: {
          isLoading: false,
          isLoaded: false,
          isError: true,
        },
        data: action.payload,
      };
    default:
      return state;
  }
};
