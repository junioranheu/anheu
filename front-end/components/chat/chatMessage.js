import { useContext, useEffect } from 'react';
import Styles from '../../styles/chat.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import diferencaEmSegundos from '../../utils/outros/diferencaEmSegundos';
import formatarData from '../../utils/outros/formatarData';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';

export default function ChatMessage({ usuario, usuarioId, id, mensagem, dataMensagem }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioIdLogado = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    function isMinhaMensagem(usuarioId) {
        const isMinhaMsg = String(usuarioIdLogado) === String(usuarioId);
        // console.log(usuarioIdLogado, usuarioId, isMinhaMsg);

        return isMinhaMsg;
    }

    function isNovaMensagem(dataMensagem) {
        const difSegundos = diferencaEmSegundos(horarioBrasilia(), dataMensagem);
        const maximoSegundosDiferenca = 3;
        const isNovaMsg = (difSegundos <= maximoSegundosDiferenca ? true : false);
        return isNovaMsg;
    }

    useEffect(() => {
        // Se a mensagem for "minha" e for nova, scrolla até ela e também aplique um efeito;
        if (isMinhaMensagem(usuarioId) && isNovaMensagem(dataMensagem)) {
            const elemento = document.getElementById(id);

            // Scrollar - https://stackoverflow.com/questions/27980084/scrolling-to-a-element-inside-a-scrollable-div-with-pure-javascript
            var topPos = elemento.offsetTop;
            document.getElementsByClassName('refDivMensagens')[0].scrollTop = topPos - 10;

            // Aplicar classe de efeito;
            elemento.className += ' animate__animated animate__fadeIn'
        }
    }, [id, usuarioId, dataMensagem]);

    return (
        <div id={id} className={`${Styles.bubble} ${(isMinhaMensagem(usuarioId) ? Styles.bubbleEsquerda : Styles.bubbleDireita)}`}>
            <p><b>{(isMinhaMensagem(usuarioId) ? 'Você' : `@${usuario}`)}</b> disse:</p>
            <p>{mensagem}</p>
            <p className={Styles.msgPequena}>{formatarData(dataMensagem)}</p>
        </div>
    )
}
