import { ActionType } from "../action-types";
import { CellTypes, CellDirection } from "../cell";

export interface IMoveCellAction {
    type: ActionType.MOVE_CELL,
    payload: {
        id: string;
        direction: CellDirection;
    }
}

export interface IDeleteCellAction {
    type: ActionType.DELETE_CELL,
    payload: {
        id: string;
    }
}

export interface IInsertCellBeforeAction {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
        id: string | null;
        type: CellTypes;
    }
}

export interface IUpdateCellAction {
    type: ActionType.UPDATE_CELL,
    payload: {
        id: string;
        data: string;
    }
}

export interface IBundleStartAction {
    type: ActionType.BUNDLE_START,
    payload: {
        id: string;
        // bundle: {
        //     code: string,
        //     err: string,
        // }
    }
}

export interface IBundleComplete {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
        id: string;
        bundle: {
            code: string,
            err: string,
        }
    }
}

export type Action =
    | IMoveCellAction
    | IDeleteCellAction
    | IInsertCellBeforeAction
    | IUpdateCellAction
    | IBundleStartAction
    | IBundleComplete;
