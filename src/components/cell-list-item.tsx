import React from "react";
import { ICell } from '../state'

interface ICellListItemProps {
    cell: ICell;
}

const CellListItem: React.FC<ICellListItemProps> = ({ cell}) => {
    return <div>{ cell.id }</div>
};

export default CellListItem;
