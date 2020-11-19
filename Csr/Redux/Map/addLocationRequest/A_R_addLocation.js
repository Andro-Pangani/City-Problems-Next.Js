import { type } from "../../types";

export const addLocation = (payload) => {
  return {
    type: type.AddLocation,
    payload,
  };
};

// const addLocationReducer = (state = [], action) => {
//   switch (action.type) {
//     case Type.AddLocation:
//       console.log(action.payload, " POST DATA >>>>>>>>  >>  > >");
//       break;

//     default:
//       break;
//   }
// };
