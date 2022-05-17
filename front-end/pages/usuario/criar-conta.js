import React from 'react';
import SessaoEsquerda from '../../components/entrar/criarConta.sessaoEsquerda.js';
import SessaoDireita from '../../components/entrar/sessaoDireita.js';
import Styles from '../../styles/entrar.module.css';

export default function CriarConta() {
    return (
        <section className={Styles.wrapper}>
            <SessaoEsquerda />
            <SessaoDireita />
        </section>
    )
}