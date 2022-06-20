import Message from '../chat/chatMessage';

export default function ChatWindow({ chat }) {
    const chatMap = chat?.map((m, i) => (
        <Message
            key={(i + 1)}
            id={(i + 1)}
            usuarioId={m.usuarioId}
            usuario={m.usuarioNomeSistema}
            mensagem={m.mensagem}
        />
    ));

    return (
        <div className='margem10'>
            {chatMap}
        </div>
    )
}
