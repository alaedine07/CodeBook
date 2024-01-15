import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { ICell } from "../state";
import { useActions } from "../hooks/use-actions";

interface ITextEditorProps {
    cell: ICell
}

const TextEditor: React.FC<ITextEditorProps> = ({ cell }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const { updateCell } = useActions();

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current &&
                event.target &&
                ref.current.contains(event.target as Node)) {
                    return;
            }
            setEditing(false);
        };
        document.addEventListener('click', listener, { capture: true});

        return () => {
            document.removeEventListener('click', listener, {capture: true});
        };
    }, []);

    if (editing) {
        return (
            <div ref={ref} className="text-editor card">
                <div className="card-content">
                    <MDEditor value={cell.data || 'Click to edit'} onChange={(v) => updateCell(cell.id, v || '')} />
                </div>
            </div>
        );
    };
    return (
        <div className="text-editor" onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={cell.data}/>
        </div>
    )
}

export default TextEditor;
