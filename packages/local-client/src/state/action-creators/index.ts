import { ActionType } from "../action-types";
import {
  IMoveCellAction,
  IDeleteCellAction,
  IInsertCellBeforeAction,
  IUpdateCellAction,
} from "../actions";
import { CellTypes, CellDirection, ICell } from "../cell";
import { Dispatch } from "redux";
import bundle from "../../bundler";
import { Action } from "../actions";
import axios from "axios";
import { RootState } from "../reducers";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: id,
      data: content,
    },
  };
};

export const deleteCell = (id: string): IDeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      id: id,
    },
  };
};

export const moveCell = (
  id: string,
  direction: CellDirection
): IMoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id: id,
      direction: direction,
    },
  };
};

export const insertCell = (
  id: string | null,
  type: CellTypes
): IInsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id: id,
      type: type,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        id: cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id: cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });
    try {
      const { data }: { data: ICell[] } = await axios.get("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETED,
        payload: data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.FETCH_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map((id) => data[id]);
    try {
      await axios.post("/cells", { cells });
    } catch (err) {
      if (err instanceof Error) {
        dispatch({
          type: ActionType.SAVE_CELLS_ERROR,
          payload: err.message,
        });
      }
    }
  };
};
