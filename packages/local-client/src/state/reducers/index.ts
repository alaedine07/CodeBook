import { combineReducers } from "redux";
import cellsReducer from "./cellsReducer";
import bundlesReducer from "./bundlesReducer";

// The combineReducers function takes an object where each key represents
// a slice of the Redux state and the corresponding value
// is the reducer responsible for managing that slice.
const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

// The root reducer (reducers) is exported so that
// it can be used when creating the Redux store.
export default reducers;

// The RootState type is exported. It represents the type of the entire
// Redux state. It is generated using the ReturnType utility type applied to
// the reducers function. This type is useful for specifying the type of the
// state when accessing it in components or actions.
export type RootState = ReturnType<typeof reducers>;
