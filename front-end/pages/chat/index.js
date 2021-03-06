import { HubConnectionBuilder } from '@microsoft/signalr';
import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatInput from '../../components/chat/chatInput';
import ChatWindow from '../../components/chat/chatWindow';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/chat.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_HUBS from '../../utils/data/constHubs';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Index() {
    document.title = 'Anheu — Chat geral';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [isLoaded, setIsLoaded] = useState(false);

    const [listaUsuariosLogados, setListaUsuariosLogados] = useState([]);
    const lastestListaUsuariosLogados = useRef(null);
    lastestListaUsuariosLogados.current = listaUsuariosLogados;

    const [chat, setChat] = useState([]);
    const latestChat = useRef(null);
    latestChat.current = chat;

    const [gambiarraParaExecutarUmaVez, setGambiarraParaExecutarUmaVez] = useState(false);
    useEffect(() => {
        setGambiarraParaExecutarUmaVez(true);
    }, []);

    // conectarSignalR e suas subfunções;
    useEffect(() => {
        // Para um bom funcionamento, deve-se ativar a opção de web sockets no Azure: https://azure.microsoft.com/pt-br/blog/introduction-to-websockets-on-windows-azure-web-sites/
        async function conectarSignalR() {
            // console.log('Tentando se conectar');
            NProgress.start();

            try {
                const connection = new HubConnectionBuilder().withUrl(`${CONSTANTS_HUBS.HUBS_CHAT}`).withAutomaticReconnect().build();

                await connection.start().then(result => {
                    Aviso.success('Você está conectado ao chat online', 3000);
                    paginaCarregada(true, 200, 500, setIsLoaded);
                    NProgress.done();

                    // #01 - UsuarioConectado;
                    connection.on('UsuarioConectado', u => {
                        // console.log('Usuário conectado: ', u);
                        if (!lastestListaUsuariosLogados.current.includes(u)) {
                            const updatedListaUsuariosLogados = [...lastestListaUsuariosLogados.current];
                            updatedListaUsuariosLogados.push(u);

                            // Ordenar a lista alfabéticamente e inserí-la em "listaUsuariosLogados";                  
                            setListaUsuariosLogados(updatedListaUsuariosLogados?.sort((a, b) => a.localeCompare(b)));
                        }
                    });

                    // #02 - ReceberMensagem;
                    connection.on('ReceberMensagem', m => {
                        // console.log('Nova mensagem: ', m);
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(m);
                        setChat(updatedChat);
                    });
                }).catch(e => console.log('Falha na conexão: ', e));
            } catch (error) {
                NProgress.done();
                console.log(error);
                Aviso.error('Houve um erro ao tentar se conectar com o servidor', 3000);
            }
        }

        if (gambiarraParaExecutarUmaVez) {
            conectarSignalR();
        }
    }, [gambiarraParaExecutarUmaVez, isAuth]);

    // usuarioConectado: verificar a cada segundo;
    useEffect(() => {
        async function postUsuarioConectado(url) {
            // Chamada para a API - usuário logado;
            await Fetch.postApi(url, null, null);
        }

        if (gambiarraParaExecutarUmaVez && isLoaded) {
            const usuarioNome = isAuth ? Auth?.getUsuarioLogado()?.nomeUsuarioSistema : '';
            const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : '';
            const url = `${CONSTANTS_HUBS.API_URL_POST_CONECTAR_USUARIO}?usuarioNome=${usuarioNome}&usuarioId=${usuarioId}`;

            // Rodar a função a cada X segundos - https://stackoverflow.com/questions/40510560/setinterval-with-setstate-in-react
            // Verificar usuário conectado;
            const poll = setInterval(() => {
                postUsuarioConectado(url);
            }, 2000);

            const poll2 = setInterval(() => {
                // Limpar array;
                setListaUsuariosLogados([]);
            }, 15000);

            return () => clearInterval(poll, poll2);
        }
    }, [gambiarraParaExecutarUmaVez, isAuth, isLoaded]);

    async function enviarMensagem(usuarioId, usuarioNomeSistema, mensagem) {
        NProgress.start();
        const jsonChat = {
            usuarioId: usuarioId,
            usuarioNomeSistema: usuarioNomeSistema,
            mensagem: mensagem,
            dataMensagem: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        };

        try {
            await Fetch.postApi(CONSTANTS_HUBS.API_URL_POST_ENVIAR_MENSAGEM_TODOS, jsonChat, null);
            NProgress.done();
        }
        catch (e) {
            const msg = 'Houve uma falha ao enviar a mensagem';
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
        <section className={`${Styles.divPrincipal} flexColumn paddingPadrao margem50`}>
            {/* <span className={`titulo ${Styles.centralizar}`}>Chat geral</span> */}
            {/* <span className='tituloDesc'>xxx</span> */}

            <ChatWindow chat={chat} listaUsuariosLogados={listaUsuariosLogados} />
            <ChatInput enviarMensagem={enviarMensagem} listaUsariosLogados={listaUsuariosLogados} />
        </section>
    );
};
