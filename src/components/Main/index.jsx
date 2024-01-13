import React, {  Component } from 'react';
import Form from '../Form';
import Modal from '../Modal';
import ListTask from '../ListTask';
import { Flip, toast } from 'react-toastify';
import './Main.css';

export default class Main extends Component {
    toastWarnId = React.createRef(null);
    state = {
        novaTarefa: '',
        tarefas: [],
        modalAberto: false,
        tarefaEditando: '',
    };

    notify = {
        success: (msg) => toast.success(msg),
        error: (msg) => toast.error(msg),
        info: (msg) => toast.info(msg),
        warning: (msg) => this.toastWarnId = toast.warning(msg, {autoClose: false}),
        updateWarningSuccess: (msg) => toast.update(this.toastWarnId, {render: msg, type: toast.TYPE.SUCCESS,  transition: Flip, autoClose: 3000}),
        updateWarningError: (msg) => toast.update(this.toastWarnId, {render: msg, type: toast.TYPE.ERROR, transition: Flip ,autoClose: false}),
        updateWarningInfo: (msg) => toast.update(this.toastWarnId, {render: msg, type: toast.TYPE.INFO, transition: Flip, autoClose: 3000}),
        clearAllToast: () => toast.dismiss()
    }



    componentDidMount() {
        const tarefasStorage = JSON.parse(localStorage.getItem('tarefas'));

        if (!tarefasStorage) return

        this.setState({ tarefas: tarefasStorage })
    }

    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;

        if (tarefas === prevState.tarefas) return;

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    handleChange = (e) => {
        this.setState({ novaTarefa: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { novaTarefa, tarefas } = this.state;

        if (!novaTarefa.trim()) return this.notify.error('O campo de tarefa não pode estar vazio');

        const index = tarefas.findIndex((tarefa) => tarefa === novaTarefa);

        if (index !== -1) {
            this.notify.error('Essa tarefa já existe');
            return;
        }

        this.setState({ novaTarefa: '', tarefas: tarefas.concat(novaTarefa) });
        this.notify.success('Tarefa adicionada')
    };

    handleClickDelete = (tarefa) => {
        const { tarefas } = this.state;
        const novasTarefas = tarefas.filter((item) => item !== tarefa);
        this.setState({ tarefas: novasTarefas });
        this.notify.info('Tarefa excluída')
    };

    handleClickEdit = (tarefa) => {
        this.notify.clearAllToast()
        this.notify.warning('Você está editando a tarefa')
        this.setState({ modalAberto: true, tarefaEditando: tarefa });
    };

    handleSaveEdit = (novoValor) => {
        const { tarefaEditando, tarefas } = this.state;

        // Verifica se o valor editado já existe ao menos um valor igual na lista
        const alreadyExists = tarefas.some((tarefa) => tarefa === novoValor);

        if (alreadyExists) {
            return this.notify.updateWarningError('Tarefa já existe')
        }

        const indexParaSalvar = tarefas.findIndex((tarefa) => tarefa === tarefaEditando);

        const novasTarefas = [...tarefas]
        novasTarefas[indexParaSalvar] = novoValor;
        this.setState({ tarefas: novasTarefas, modalAberto: false, tarefaEditando: '' });
        this.notify.updateWarningSuccess("Tarefa editada")
    };


    closeModal = () => {
        this.setState({ modalAberto: false, tarefaEditando: '' });
        this.notify.updateWarningInfo("Edição cancelada")

    };

    render() {
        const { novaTarefa, tarefas, modalAberto, tarefaEditando } = this.state;
        return (
            <div className="main">
                <h1>Lista de tarefas</h1>

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <ListTask
                    tarefas={tarefas}
                    handleClickEdit={this.handleClickEdit}
                    handleClickDelete={this.handleClickDelete}
                />

                <Modal
                    isOpen={modalAberto}
                    onRequestClose={this.closeModal}
                    tarefaEditando={tarefaEditando}
                    salvarEdicao={this.handleSaveEdit}
                />
            </div>
        );
    }
}
