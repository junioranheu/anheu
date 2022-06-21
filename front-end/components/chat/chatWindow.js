import Styles from '../../styles/chat.module.css';
import Message from '../chat/chatMessage';

export default function ChatWindow({ chat }) {
    // const chatMap = chat?.slice(0).reverse().map((m, i) => (
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

    return (
        <div className={`refDivMensagens ${Styles.divMensagens}`}>
            {chatMap}

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </div>
    )
}
