import { useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import { Auth } from '../../utils/context/usuarioContext';

export default function ChatInput({ enviarMensagem }) {
    const [msg, setMsg] = useState('');

    function onSubmit(e) {
        e.preventDefault();

        const usuarioId = Auth.getUsuarioLogado().usuarioId;
        const usuarioNomeSistema = Auth.getUsuarioLogado().nomeUsuarioSistema;
        const isMessageProvided = msg && msg !== '';

        if (!isMessageProvided) {
            Aviso.warn('Sua mensagem está vazia!', 3000);
            return false;
        }

        if (usuarioId && usuarioNomeSistema) {
            enviarMensagem(usuarioId, usuarioNomeSistema, msg);
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
            />

            <div onClick={(e) => onSubmit(e)} className='margem20'>
                <Botao texto='Enviar mensagem' url={null} isNovaAba={false} Svg={null} isEnabled={true} />
            </div>
        </div>
    )
}
