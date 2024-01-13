import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './Form.css';

// Declaração de propTypes
Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    novaTarefa: PropTypes.string.isRequired,
};

// Definição do componente Form
export default function Form({ handleSubmit, handleChange, novaTarefa }) {
    return (
        <form action="#" className="form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Digite suas tarefas"
                onChange={handleChange}
                value={novaTarefa}
            />
            <button type="submit">
                <FaPlus />
            </button>
        </form>
    );
}
