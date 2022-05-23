import React, { useContext, useEffect } from 'react';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';

export default function Index() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const nomeUsuario = isAuth ? Auth?.getUsuarioLogado()?.nomeUsuarioSistema : 'amigo';
    const usuarioGenero = isAuth ? Auth?.getUsuarioLogado()?.genero : 'o';
    
    useEffect(() => {
        // Título da página;
        document.title = 'Anheu — Início';
    }, []);

    return (
        <div className='paddingPadrao margem50 flexColumn'>
            <span className='topico'>Bem-vind{usuarioGenero}, {nomeUsuario}</span>
        </div>
    )
} 
