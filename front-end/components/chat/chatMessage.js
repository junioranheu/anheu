import { useContext } from 'react';
import Styles from '../../styles/chat.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import formatarData from '../../utils/outros/formatarData';

export default function ChatMessage({ usuario, usuarioId, id, mensagem, dataMensagem }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioIdLogado = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    function isMinhaMensagem(usuarioId) {
        const isMinhaMsg = String(usuarioIdLogado) === String(usuarioId);
        // console.log(usuarioIdLogado, usuarioId, isMinhaMsg);

        return isMinhaMsg;

    }

    return (
        <div className={`${Styles.bubble} ${(isMinhaMensagem(usuarioId) ? Styles.bubbleEsquerda : Styles.bubbleDireita)}`}>
            <p><b>{(isMinhaMensagem(usuarioId) ? 'Você' : `@${usuario}`)}</b> disse:</p>
            <p>{mensagem}</p>
            <p className={`${Styles.msgPequena} ${Styles.forcarTextoDireita}`}>{formatarData(dataMensagem)}</p>
        </div>
    )
}
