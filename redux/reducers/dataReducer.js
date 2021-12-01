import { BLOGS } from "../types";

const initialState = {
  blogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BLOGS:
      return Object.assign({}, state, { blogs: action.payload });

    default:
      return state;
  }
};
