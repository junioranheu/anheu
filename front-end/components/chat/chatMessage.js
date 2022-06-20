
export default function ChatMessage({usuario, usuarioId, id, mensagem}) {
    return (
        <div style={{ background: "#eee", borderRadius: '5px', padding: '0 10px' }}>
            <p><strong>{usuario}</strong> ({usuarioId}) disse:</p>
            <p>{mensagem} ({id})</p>
        </div>
    )
}
