import { Fragment } from 'react';
import Styles from '../../styles/chat.module.css';
import Message from '../chat/chatMessage';

export default function ChatWindow({ chat, listaUsuariosLogados }) {
    const chatMap = chat?.map((m, i) => (
        <Message
            key={(i + 1)}
            id={(i + 1)}
            usuarioId={m.usuarioId}
            usuario={m.usuarioNomeSistema}
            mensagem={m.mensagem}
            dataMensagem={m.dataMensagem}
        />
    ));

    const uniqueListaUsuariosLogados = [...new Set(listaUsuariosLogados.map(item => item))];
    const listaUsuariosLogadosMap = uniqueListaUsuariosLogados?.map((l, i) => (
        <div key={i}>
            {l}
        </div>
    ));

    return (
        <Fragment>
            <div>
                {listaUsuariosLogadosMap}
            </div>

            <div className={`refDivMensagens ${Styles.divMensagens}`}>
                {chatMap}

                {/* Espaço a mais */}
                <div className='espacoBottom'></div>
            </div>
        </Fragment>
    )
}
