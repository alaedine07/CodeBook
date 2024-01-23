import { ActionType } from "../action-types";
import { Action } from "../actions";
import { ICell } from "../cell";
import { produce } from "immer";

interface ICellState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: ICell;
  };
}

const initialState: ICellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

const reducer = produce(
  (state: ICellState = initialState, action: Action): ICellState | void => {
    let index: number;
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;
      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;
      case ActionType.FETCH_CELLS_COMPLETED:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as ICellState["data"]);
        return state;
      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;
      case ActionType.UPDATE_CELL:
        // return a completly new object (Redux way)
        return {
          ...state,
          data: {
            ...state.data,
            [action.payload.id]: {
              ...state.data[action.payload.id],
              data: action.payload.data,
            },
          },
        };
      case ActionType.DELETE_CELL:
        delete state.data[action.payload.id];
        return state;
      case ActionType.MOVE_CELL:
        const direction = action.payload.direction;
        index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: ICell = {
          data: "",
          type: action.payload.type,
          id: randomId(),
        };
        state.data[cell.id] = cell;
        index = state.order.findIndex((id) => id === action.payload.id);
        if (index < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(index, 0, cell.id);
        }
        return state;
      default:
        return state;
    }
  },
  initialState
);

export default reducer;
