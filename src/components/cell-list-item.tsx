import React from "react";
import { ICell } from '../state'
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import './cell-list-item.css';

interface ICellListItemProps {
    cell: ICell;
}

const CellListItem: React.FC<ICellListItemProps> = ({ cell}) => {
    let child: JSX.Element;
    if (cell.type === 'code') {
        child = <CodeCell cell={cell} />;
    } else {
        child = <TextEditor cell={cell} />;
    }
    return (
        <div className="cell-list-item">
            <ActionBar id={ cell.id }/>
            { child }
        </div>
    );
};

export default CellListItem;
