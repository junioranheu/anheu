import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';
import ChatInput from '../../components/chat/chatInput';
import ChatWindow from '../../components/chat/chatWindow';
import CONSTANTS_HUBS from '../../utils/data/constHubs';

export default function Index() {
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${CONSTANTS_HUBS.HUBS_CHAT}`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');

                    connection.on('ReceiveMessage', message => {
                        console.log('x');
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        console.log(user, message);

        const chatMessage = {
            chatId: 1,
            usuario: user,
            mensagem: message
        };

        if (connection.connection._connectionStarted) {
            try {
                await connection.send('SendMessage', chatMessage);
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
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
