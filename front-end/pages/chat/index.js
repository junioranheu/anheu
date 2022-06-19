import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import ChatInput from '../../components/chat/chatInput';
import ChatWindow from '../../components/chat/chatWindow';
import CONSTANTS_HUBS from '../../utils/data/constHubs';

export default function Index() {
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
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            chatId: 1111111111,
            usuario: user,
            mensagem: message
        };

        try {
            await fetch(CONSTANTS_HUBS.API_URL_POST_ENVIAR_MENSAGEM_TODOS, {
                method: 'POST',
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }
    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>
    );
};
