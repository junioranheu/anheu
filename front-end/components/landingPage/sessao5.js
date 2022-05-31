import Image from 'next/image';
import React from 'react';
import Chaleco from '../../static/landingPage/chaleco.webp';
import Styles from '../../styles/landingPage.module.css';
import CardGigante from '../outros/cardGigante.js';

export default function Sessao5({ isAuth }) {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            {/* Comentário */}
            <div className={`${Styles.divUsuarioComentario} ${Styles.margemTopG}`}>
                <div className='pointer' title='Chaleco ctm'>
                    <Image src={Chaleco} alt='' />
                </div>

                <div>
                    <span>Israel Cabrera Chaleco</span>
                    <span>Estudante de Ciência da Computação em Santiago</span>
                </div>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>“Com a possibilidade de aprender a programar,</span>
                <span className={Styles.descricaoTituloPrincipal}>com a ajuda do Anheu, consegui aprender desde o HTML e CSS</span>
                <span className={Styles.descricaoTituloPrincipal}>até o React.js e Next.js em apenas 3 semanas — eu sei que,</span>
                <span className={Styles.descricaoTituloPrincipal}>isso seria bem difícil aprendendo sozinho.”</span>
            </div>

            {/* Card gigante */}
            <div className={Styles.margemTopG}>
                {
                    isAuth ? (
                        <CardGigante
                            titulo='Assista às suas aulas no Anheu agora mesmo'
                            subtitulo=''
                            textoBotao='Assistir'
                            url='disciplinas'
                            isNovaAba={false}
                        />
                    ) : (
                        <CardGigante
                            titulo='Entre no Anheu agora mesmo'
                            subtitulo=''
                            textoBotao='Entrar'
                            url='usuario/entrar'
                            isNovaAba={false}
                        />
                    )
                }

            </div>
        </section>
    )
}
