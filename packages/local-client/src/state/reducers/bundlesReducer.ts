import { produce } from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface IBundlesState {
    [key: string]: {
        loading: boolean;
        code: string;
        err: string;
    } | undefined;
}

const initialState: IBundlesState = {};

const reducer = produce((state: IBundlesState = initialState, action: Action): IBundlesState => {
    switch (action.type) {
        case ActionType.BUNDLE_START:
            state[action.payload.id] = {
                loading: true,
                code: '',
                err: ''
            };
            return state;
        case ActionType.BUNDLE_COMPLETE:
            state[action.payload.id] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            };
            return state;
        default:
            return state;
    }
}, initialState);

export default reducer;