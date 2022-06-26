import { useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/chat.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function ChatInput({ enviarMensagem, listaUsariosLogados }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const nomeUsuarioSistemaAuth = isAuth ? Auth?.getUsuarioLogado()?.nomeUsuarioSistema : null;

    const [msg, setMsg] = useState('');
    const refChat = useRef();
    const refBtnEnviarMsg = useRef();

    // Lógica para "normalizar" (com gambiarra/lógica dos deuses) a questão da lista de usuários logados;
    // Isso faz com que os dados não fiquem com "flickering";
    const [listaUsuariosLogadosOk, setListaUsuariosLogadosOk] = useState([]);
    useEffect(() => {
        if (listaUsariosLogados?.length) {
            setListaUsuariosLogadosOk(listaUsariosLogados);
        }
    }, [listaUsariosLogados]);

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtnEnviarMsg.current.click();
        }
    }

    function isMinhaMensagem(nomeUsuarioSistema) {
        const isMinhaMsg = nomeUsuarioSistema === nomeUsuarioSistemaAuth;
        return isMinhaMsg;
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
                refChat.current.focus();
            }, 100);
        }
        else {
            Aviso.error('Houve algum erro com relação à autenticação do seu usuário ao enviar a mensagem', 3000);
            return false;
        }
    }

    const listaEmojis = ['😀', '😁', '😂', '🙃', '😍', '🥲', '😝', '😑', '😒', '😪', '😞', '😭', '😠', '😡', '😈', '👿', '🤡', '💩'];

    function enviarEmoji(e) {
        const emoji = e.target.innerText;
        setMsg(`${msg}${emoji}`);
    }

    return (
        <div>
            <div className={`${Styles.divListaItens} ${Styles.divEmojis}`}>
                {
                    listaEmojis?.map((item, i) => (
                        <span className={Styles.itemLista} onClick={(e) => enviarEmoji(e)} key={i}>{item}</span>
                    ))
                }
            </div>

            {
                listaUsuariosLogadosOk?.length > 0 && (
                    <div className={Styles.divListaItens} title='Usuários on-line agora no chat'>
                        {/* <span>Usuários on-line: </span> */}

                        {
                            listaUsuariosLogadosOk?.map((u, i) => (
                                <span className='tag' key={i} title={`Usuário on-line: @${u}`}>
                                    {(isMinhaMensagem(u) ? 'você' : `@${u}`)}
                                </span>
                            ))
                        }
                    </div>
                )
            }

            <textarea
                placeholder='Escreva sua mensagem aqui'
                type='text'
                value={msg}
                className={`input ${Styles.textareaCustom}`}
                onChange={(e) => setMsg(e.target.value)}
                ref={refChat}
                onKeyPress={handleKeyPress}
            />

            <div onClick={(e) => onSubmit(e)} className={Styles.botaoCustom}>
                <Botao texto='Enviar mensagem' url={null} isNovaAba={false} Svg={null} refBtn={refBtnEnviarMsg} isEnabled={true} />
            </div>
        </div>
    )
}
