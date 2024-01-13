import { useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import { toast } from 'react-toastify'



const Modal = ({ isOpen, onRequestClose, tarefaEditando, salvarEdicao }) => {
    const notify = {
        error: (msg) => toast.error(msg)
    }
    const [novoValor, setnovoValor] = useState(tarefaEditando);
    const handleSave = () => {
        if (!novoValor.trim()) return notify.error("O campo de tarefa não pode estar vazio")
        salvarEdicao(novoValor);
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="modal-content">
                    <h2>Editar Tarefa</h2>
                    <input
                        type="text"
                        placeholder={tarefaEditando}
                        onChange={(e) => setnovoValor(e.target.value)}
                    />
                    <div className="modal-buttons">
                        <button onClick={handleSave} className='salvar'>Salvar</button>
                        <button onClick={onRequestClose} className='cancelar'>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Fica aqui em baixo por causa que o Hoinsting(eleva function e var para o topo) não funciona em arrow functions
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    tarefaEditando: PropTypes.string.isRequired,
    salvarEdicao: PropTypes.func.isRequired,
};

export default Modal;
