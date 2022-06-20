import { HubConnectionBuilder } from '@microsoft/signalr';
import Router from 'next/router';
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
        const connection = new HubConnectionBuilder()
            .withUrl(`${CONSTANTS_HUBS.HUBS_CHAT}`)
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);

                    setChat(updatedChat);
                });

                paginaCarregada(true, 200, 500, setIsLoaded);
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    async function sendMessage(user, message) {
        const chatMessage = {
            chatId: 1111111111,
            usuario: user,
            mensagem: message
        };

        try {
            await Fetch.postApi(CONSTANTS_HUBS.API_URL_POST_ENVIAR_MENSAGEM_TODOS, chatMessage, null);
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

            <ChatInput sendMessage={sendMessage} />
            <ChatWindow chat={chat} />
        </section>
    );
};
