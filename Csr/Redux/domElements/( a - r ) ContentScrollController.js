const { type } = require('../types');

// TURNS - OFF OR -ON REQUEST FROM SCROLL
// IN CONTENT DIV ELEMENT

export const setContentScrollController = (payload) => {
  return {
    type: type.contentScrollController,
    payload,
  };
};

export const ContentScrollControllerReducer = (state = true, action) => {
  switch (action.type) {
    case type.contentScrollController:
      return action.payload;
    default:
      return state;
  }
};
