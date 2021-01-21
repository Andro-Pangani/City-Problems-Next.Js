const { type } = require("./types");

export const setAlternativeButtonClicked = (payload) => {
  return {
    type: type.Alternative.buttonClick,
    payload,
  };
};

export const alternativeButtonReducer = (state = false, action) => {
  switch (action.type) {
    case type.Alternative.buttonClick:
      return action.payload;
    default:
      return state;
  }
};
