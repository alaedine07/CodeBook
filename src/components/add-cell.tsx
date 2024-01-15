import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface IAddCellProps {
    nextCellId: string | null,
    forceVisible?: boolean,
}

const AddCell: React.FC<IAddCellProps> = ({ nextCellId, forceVisible }) => {

    const { insertCell } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-visible'}`}>
            <div className='add-buttons'>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCell(nextCellId, 'code')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>Code</span>
                </button>
                <button className='button is-rounded is-primary is-small' onClick={() => insertCell(nextCellId, 'text')}>
                    <span className='icon is-small'>
                        <i className='fas fa-plus'></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className='divider'></div>
        </div>
    );
}

export default AddCell
