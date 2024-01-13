import PropTypes from "prop-types";
import { FaEdit as ButtonEdit, FaWindowClose as ButtonDelete } from 'react-icons/fa';
import './ListTask.css'

const ListTask = ({ tarefas, handleClickEdit, handleClickDelete }) => {
    return (<ul className="tarefas">
        {tarefas.map((tarefa) => {
            return (
                <li key={tarefa}>
                    {tarefa}
                    <div>
                        <ButtonEdit className="edit" onClick={() => handleClickEdit(tarefa)} />
                        <ButtonDelete className="delete" onClick={() => handleClickDelete(tarefa)} />
                    </div>
                </li>
            );
        })}
    </ul>
    )
}

ListTask.propTypes = {
    tarefas: PropTypes.arrayOf(PropTypes.string),
    handleClickEdit: PropTypes.func,
    handleClickDelete: PropTypes.func
}

export default ListTask;