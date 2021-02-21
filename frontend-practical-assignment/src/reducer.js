export const initialState = {
  term: [],
};

export const actionTypes = {
  ADD_FAV: "ADD_FAV",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_FAV:
      return {
        ...state,
        term: action.term,
      };
    default:
      return state;
  }
};

export default reducer;
