export function user(
  state = { user: [], bids: [], highBid: [], image: [] },
  action
) {
  switch (action.type) {
    case "SignUp":
      return {
        state,
      };
    case "AddItem":
      return {
        user: state.user,
      };
    case "getData":
      return {
        ...state,
        user: action.payload,
      };
    case "bidData":
      return {
        user: state.user,
      };
    case "getImage":
      return {
        ...state,
        image: action.payload,
      };
    case "getBid":
      return {
        ...state,
        bids: action.payload,
      };
    case "highBid":
      return {
        user: state.user,
      };
    case "getHighBid":
      return {
        ...state,
        highBid: action.payload,
      };
    default:
      return state;
  }
}
