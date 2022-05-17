import React, { useEffect } from 'react';
import SessaoDireita from '../../components/entrar/sessaoDireita.js';
import SessaoEsquerda from '../../components/entrar/sessaoEsquerda.js';
import Styles from '../../styles/entrar.module.css';

export default function Entrar() {
    
    useEffect(() => {
        // Título da página;
        document.title = `Entrar — Anheu`;
    }, []);

    return (
        <section className={Styles.wrapper}>
            <SessaoEsquerda />
            <SessaoDireita />
        </section>
    )
}