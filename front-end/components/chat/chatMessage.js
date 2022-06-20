import { useContext } from 'react';
import Styles from '../../styles/chat.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function ChatMessage({ usuario, usuarioId, id, mensagem }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioIdLogado = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    function isMinhaMensagem(usuarioId) {
        const isMinhaMsg = String(usuarioIdLogado) === String(usuarioId);
        // console.log(usuarioIdLogado, usuarioId, isMinhaMsg);
        
        return isMinhaMsg;
    }

    return (
        <div className={`${Styles.bubble} ${(!isMinhaMensagem(usuarioId) ? Styles.bubbleDireita : null)}`}>
            <p><strong>@{usuario}</strong> disse:</p>
            <p>{mensagem}</p>
        </div>
    )
}
