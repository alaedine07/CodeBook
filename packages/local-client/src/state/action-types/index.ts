export enum ActionType {
    MOVE_CELL = 'move_cell',
    DELETE_CELL = 'delete_cell',
    INSERT_CELL_BEFORE = 'insert_cell_before',
    UPDATE_CELL = 'update_cell',
    BUNDLE_START = 'bundle_start',
    BUNDLE_COMPLETE = 'bundle_complete',
    FETCH_CELLS = 'fetch_cells',
    FETCH_CELLS_COMPLETED = 'fetch_cells_completed',
    FETCH_CELLS_ERROR = 'fetch_cells_error',
    SAVE_CELLS_ERROR = 'save_cells_error',
}
