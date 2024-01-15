import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import { ICell } from '../state';
import { useActions } from '../hooks/use-actions';

interface ICodeCellPros {
    cell: ICell
}

const CodeCell: React.FC<ICodeCellPros> = ({ cell }) => {
    const [code, setCode] = useState('');
    const [err, setErr]  = useState('');
    const { updateCell } = useActions();

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.data);
            setCode(output.code);
            setErr(output.err);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }, [cell.data]);

    return (
        <Resizable direction='vertical'>
            <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue={ cell.data }
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} bundlingStatus={err} />
            </div>
        </Resizable>
    );
};

export default CodeCell;
