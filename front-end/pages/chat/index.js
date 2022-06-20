import { HubConnectionBuilder } from '@microsoft/signalr';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatInput from '../../components/chat/chatInput';
import ChatWindow from '../../components/chat/chatWindow';
import { Aviso } from '../../components/outros/aviso';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_HUBS from '../../utils/data/constHubs';
import { Fetch } from '../../utils/outros/fetch';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Index() {
    document.title = 'Anheu — Chat geral';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [isLoaded, setIsLoaded] = useState(false);

    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        NProgress.start();
        const connection = new HubConnectionBuilder()
            .withUrl(`${CONSTANTS_HUBS.HUBS_CHAT}`)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                Aviso.success('Você está conectado ao chat online', 3000);

                connection.on('ReceiveMessage', message => {
                    // console.log('Nova mensagem: ', message);
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
                });

                paginaCarregada(true, 200, 500, setIsLoaded);
                NProgress.done();
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    async function enviarMensagem(usuarioId, usuarioNomeSistema, mensagem) {
        NProgress.start();
        const jsonChat = {
            usuarioId: usuarioId,
            usuarioNomeSistema: usuarioNomeSistema,
            mensagem: mensagem
        };

        try {
            await Fetch.postApi(CONSTANTS_HUBS.API_URL_POST_ENVIAR_MENSAGEM_TODOS, jsonChat, null);
            NProgress.done();
        }
        catch (e) {
            const msg = 'Falha em enviar a mensagem';
            console.log(msg, e);
            Aviso.error(msg, 3000);
        }
    }

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={'flexColumn paddingPadrao margem50'}>
            <span className='titulo'>Chat geral</span>
            {/* <span className='tituloDesc'>xxx</span> */}

            <ChatInput enviarMensagem={enviarMensagem} />
            <ChatWindow chat={chat} />
        </section>
    );
};
