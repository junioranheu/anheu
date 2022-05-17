import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';

export default function Index() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const nomeUsuario = isAuth ? Auth?.getUsuarioLogado()?.nomeUsuarioSistema : 'amigo';

    useEffect(() => {
        // Título da página;
        document.title = `Início — Anheu`;
    }, []);

    return (
        <div className='paddingPadrao margem50 flexColumn'>
            <Link href='/disciplinas'>
                <a className='topico'>Disciplinas</a>
            </Link>

            <Link href='/cursos'>
                <a className='topico'>Cursos</a>
            </Link>

            <span className='topico'>Olá, {nomeUsuario}</span>
        </div>
    )
} 
