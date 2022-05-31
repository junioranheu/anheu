import Image from 'next/image';
import React from 'react';
import Chaleco from '../../static/landingPage/chaleco.webp';
import Styles from '../../styles/index.module.css';
import CardGigante from '../outros/cardGigante.js';

export default function Sessao4() {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            {/* Comentário */}
            <div className={`${Styles.divUsuarioComentario} ${Styles.margemTopG}`}>
                <div className='pointer' title='Chaleco ctm'>
                    <Image src={Chaleco} alt='' />
                </div>

                <div>
                    <span>Israel Chaleco:</span>
                    <span>Estudante de Ciência da Computação em Santiago</span>
                </div>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>“Com a possibilidade de programar qualquer coisa</span>
                <span className={Styles.descricaoTituloPrincipal}>com a ajuda do Framer, foi possível criar componentes</span>
                <span className={Styles.descricaoTituloPrincipal}>super dinâmicos muito facilmente — eu sei que,</span>
                <span className={Styles.descricaoTituloPrincipal}>isso seria bem difícil fazendo à mão ou usando outra ferramenta.”</span>
            </div>

            {/* Card gigante */}
            <div className={Styles.margemTopG}>
                <CardGigante
                    titulo='Entre no nosso servidor do Discord agora mesmo'
                    subtitulo='Tenha suporte dedicado nos nossos canais, explore novas ideias e mostre seu trabalho.'
                    textoBotao='Entrar'
                    url='https://discord.gg/RdKDenAu8d'
                    isNovaAba={true}
                />
            </div>
        </section>
    )
}
