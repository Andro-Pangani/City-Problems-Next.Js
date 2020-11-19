import { type } from "../types";

export const mapTempAddressList = (payload) => ({
  type: type.Map.TempAddressListRequest,
  payload,
});

export const mapTempAddressListClear = () => ({
  type: type.Map.TempAddressListClear,
});

export const mapTempAddressListReducer = (state = [], action) => {
  switch (action.type) {
    case type.Map.TempAddressListRequest:
      return action.payload;
    case type.Map.TempAddressListClear:
      console.log(" <========== TEMP ADDRESS LIST CLEAR ============>");
      return undefined;
    default:
      return [];
  }
};
