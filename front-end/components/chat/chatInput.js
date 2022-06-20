import { useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/chat.module.css';
import { Auth } from '../../utils/context/usuarioContext';

export default function ChatInput({ enviarMensagem }) {
    const [msg, setMsg] = useState('');
    const refChat = useRef();

    function onSubmit(e) {
        e.preventDefault();
        const usuarioId = Auth.getUsuarioLogado().usuarioId;
        const usuarioNomeSistema = Auth.getUsuarioLogado().nomeUsuarioSistema;
        const isMessageProvided = msg && msg !== '';

        if (!isMessageProvided) {
            refChat.current.select();
            Aviso.warn('Sua mensagem está vazia!', 3000);
            return false;
        }

        if (usuarioId && usuarioNomeSistema) {
            enviarMensagem(usuarioId, usuarioNomeSistema, msg);

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
            <input
                placeholder='Escreva sua mensagem aqui'
                type='text'
                value={msg}
                className='input margem10'
                onChange={(e) => setMsg(e.target.value)}
                ref={refChat}
            />

            <div onClick={(e) => onSubmit(e)} className={`margem20 ${Styles.botaoCustom}`}>
                <Botao texto='Enviar mensagem' url={null} isNovaAba={false} Svg={null} isEnabled={true} />
            </div>
        </div>
    )
}
