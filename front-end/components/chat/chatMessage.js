
export default function ChatMessage(props) {
    return (
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p><strong>{props.usuario}</strong> says ({props.id}):</p>
            <p>{props.mensagem}</p>
        </div>
    )
}
