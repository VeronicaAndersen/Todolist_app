import { RiCloseCircleLine } from 'react-icons/ri';
import { AiOutlineCheck } from 'react-icons/ai';

function ListItem({ text, isChecked, toggleChecked, deleteTodo }) {
    return (
        <div className="todo">
            <div
                className={isChecked ? 'todo_radio' : 'todo_radio_unchecked'}
                onClick={toggleChecked}
            >
                {isChecked && <AiOutlineCheck />}
            </div>

            <div className={isChecked ? 'todo-row complete' : 'todo-row'}>
                {text}
            </div>

            <div className="todo_delete" onClick={deleteTodo}>
                <RiCloseCircleLine className="delete-icon" />
            </div>
        </div>
    );
}

export default ListItem;
