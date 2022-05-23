import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import SessaoDireita from '../../components/entrar/sessaoDireita.js';
import SessaoEsquerda from '../../components/entrar/sessaoEsquerda.js';
import Styles from '../../styles/entrar.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';
 
export default function Entrar() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const [isPrimeiroLoading, setIsPrimeiroLoading] = useState(true);
    useEffect(() => {
        // Título da página;
        document.title = 'Anheu — Entrar';

        // Criar variável para que o Router.push abaixo não bugue;
        // Se for o primeiro loading, permita o push acontecer, já que o usuário estaria entrando na tela por querer, mesmo estando logado;
        setIsPrimeiroLoading(false);
    }, []);

    if (isAuth && isPrimeiroLoading) {
        Router.push({ pathname: '/404', query: { msg: 'autenticado' } });
        return false;
    }

    return (
        <section className={Styles.wrapper}>
            <SessaoEsquerda />
            <SessaoDireita />
        </section>
    )
}