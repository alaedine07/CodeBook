import { ActionType } from "../action-types";
import { IMoveCellAction, IDeleteCellAction, IInsertCellBeforeAction, IUpdateCellAction } from "../actions";
import { CellTypes, CellDirection } from "../cell";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id: id,
            data: content,
        }
    };
};

export const deleteCell = (id: string): IDeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            id: id,
        }
    };
};

export const moveCell = (id: string, direction: CellDirection ): IMoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id: id,
            direction: direction,
        }
    };
};

export const insertCell = (id: string | null, type: CellTypes): IInsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id: id,
            type: type,
        }
    };
};
