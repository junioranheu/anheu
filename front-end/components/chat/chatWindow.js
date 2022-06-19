import Message from '../chat/chatMessage';

export default function ChatWindow(props) {
    const chat = props.chat.map(m =>
        <Message
            key={Date.now() * Math.random()}
            id={m.chatId}
            usuario={m.usuario}
            mensagem={m.mensagem}
        />
    );

    return (
        <div>
            {chat}
        </div>
    )
}
