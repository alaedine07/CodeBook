import { produce } from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

// the IBundlesState interface defines a state is
// structure where each key is a string (representing the id of a bundle),
// and the value associated with each key can either be an object with
// properties loading, code, and err, or it can be undefined.
interface IBundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: IBundlesState = {};

// produce: The produce function from the immer library is used to create a
//  new  state based on the current state with modifications. It simplifies
// the process of working with immutable state in a more mutable syntax.
const reducer = produce(
  (state: IBundlesState = initialState, action: Action): IBundlesState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.id] = {
          loading: true,
          code: "",
          err: "",
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
