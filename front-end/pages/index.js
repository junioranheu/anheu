import React, { useContext, useEffect, useState } from 'react';
import Sessao1 from '../components/landingPage/sessao1';
import Sessao2 from '../components/landingPage/sessao2';
import Sessao3 from '../components/landingPage/sessao3';
import Sessao4 from '../components/landingPage/sessao4';
import Sessao5 from '../components/landingPage/sessao5';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';
import paginaCarregada from '../utils/outros/paginaCarregada';

export default function Index() {
    document.title = 'Anheu — Início';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const nomeUsuario = isAuth ? Auth?.getUsuarioLogado()?.nomeUsuarioSistema : '';
    const usuarioGenero = isAuth ? Auth?.getUsuarioLogado()?.genero : 'o';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section>
            <Sessao1 isAuth={isAuth} nomeUsuario={nomeUsuario} usuarioGenero={usuarioGenero} />
            <Sessao2 />
            <Sessao3 />
            <Sessao4 />
            <Sessao5 isAuth={isAuth} />
        </section>
    )
} 
