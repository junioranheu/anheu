import { useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/chat.module.css';
import { Auth } from '../../utils/context/usuarioContext';

export default function ChatInput({ enviarMensagem }) {
    const [msg, setMsg] = useState('');
    const refChat = useRef();
    const refBtnEnviarMsg = useRef();

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtnEnviarMsg.current.click();
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        const usuarioId = Auth.getUsuarioLogado().usuarioId;
        const usuarioNomeSistema = Auth.getUsuarioLogado().nomeUsuarioSistema;
        const isMessageProvided = msg.trim() && msg.trim() !== '';

        if (!isMessageProvided) {
            refChat.current.select();
            Aviso.warn('Sua mensagem está vazia!', 3000);
            return false;
        }

        if (usuarioId && usuarioNomeSistema) {
            enviarMensagem(usuarioId, usuarioNomeSistema, msg.trim());

            setTimeout(function () {
                refChat.current.value = '';
                setMsg('');
            }, 100);
        }
        else {
            Aviso.error('Houve algum erro com relação à autenticação do seu usuário ao enviar a mensagem', 3000);
            return false;
        }
    }

    return (
        <div>
            <textarea
                placeholder='Escreva sua mensagem aqui'
                type='text'
                value={msg}
                className='input margem10'
                onChange={(e) => setMsg(e.target.value)}
                ref={refChat}
                onKeyPress={handleKeyPress}
            />

            <div onClick={(e) => onSubmit(e)} className={`margem10 ${Styles.botaoCustom}`}>
                <Botao texto='Enviar mensagem' url={null} isNovaAba={false} Svg={null} refBtn={refBtnEnviarMsg} isEnabled={true} />
            </div>
        </div>
    )
}
