import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SessaoDireita from '../../components/entrar/sessaoDireita.js';
import SessaoEsquerda from '../../components/entrar/sessaoEsquerda.js';
import Botao from '../../components/outros/botao.js';
import Voltar from '../../components/svg/voltar.js';
import Styles from '../../styles/entrar.module.css';

export default function Entrar() {
    const router = useRouter();

    useEffect(() => {
        // Título da página;
        document.title = `Entrar — Anheu`;
    }, []);

    return (
        <section className={Styles.wrapper}>
            <div className={Styles.botaoCustomAbsoluto} onClick={router.back}>
                <Botao texto='&nbsp;&nbsp;Voltar' url={''} isNovaAba={false} Svg={<Voltar />} />
            </div>

            <SessaoEsquerda />
            <SessaoDireita />
        </section>
    )
}