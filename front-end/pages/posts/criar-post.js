import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function CriarPost() {
    document.title = 'Anheu — Criar novo post';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioTipoId = isAuth ? Auth?.getUsuarioLogado()?.usuarioTipoId : '';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }
 
    if (usuarioTipoId !== 1) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }
  
    return (
        <section className={'flexColumn paddingPadrao margem50'}>
            <span className='titulo'>Criar novo post</span>

            {/* INPUTS AQUI */} 

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

