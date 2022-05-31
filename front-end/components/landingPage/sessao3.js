import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Seta from '../../components/svg/seta.js';
import ImagemSessao3 from '../../static/landingPage/imgSessao3.webp';
import Styles from '../../styles/index.module.css';

export default function Sessao3() {
    return (
        <section className={Styles.principal}>
            <span className={`${Styles.efeitoTextoCorPrincipal} ${Styles.margemTitulo}`}>Recurso em desenvolvimento</span>

            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTopP}`}>
                <span className={Styles.tituloPrincipalMedio}>Use os componentes do Framer</span>
                <span className={Styles.tituloPrincipalMedio}>em produção com um simples</span>
                <span className={Styles.tituloPrincipalMedio}>comando de importação</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>Lançamos um novo fantástico recurso,</span>
                <span className={Styles.descricaoTituloPrincipal}>que permite que importe os componentes</span>
                <span className={Styles.descricaoTituloPrincipal}>diretamente no seu código em React.</span>
            </div>

            <div className={Styles.margemTopP}>
                <Link href='/docs'><a className={Styles.link}>Saiba mais <Seta width={'1.9rem'} /></a></Link>
            </div>

            <div className={`${Styles.divMedia} ${Styles.margemTopG}`}>
                <Image src={ImagemSessao3} alt='' className={Styles.imagem} />
            </div>
        </section>
    )
}