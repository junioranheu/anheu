import { useContext, useEffect, useState } from 'react';
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

    const [animarDiv, setAnimarDiv] = useState('');
    useEffect(() => {
        setTimeout(function () {
            setAnimarDiv('animate__animated animate__fadeIn delay03');
        }, 2000);
    }, []);

    return (
        <div id={id} className={`${Styles.bubble} ${(isMinhaMensagem(usuarioId) ? Styles.bubbleEsquerda : Styles.bubbleDireita)} ${animarDiv}`}>
            <p><b>{(isMinhaMensagem(usuarioId) ? 'Você' : `@${usuario}`)}</b> disse:</p>
            <p>{mensagem}</p>
            <p className={Styles.msgPequena}>{formatarData(dataMensagem)}</p>
        </div>
    )
}
