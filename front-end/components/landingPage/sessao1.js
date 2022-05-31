import Link from 'next/link';
import React from 'react';
import Video1 from '../../static/landingPage/1.mp4';
import Styles from '../../styles/index.module.css';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import CardGrande from '../outros/cardGrande.js';
import Seta from '../svg/seta.js';

export default function Sessao1({ isAuth, nomeUsuario, usuarioGenero }) {
    return (
        <section className={Styles.principal}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipal}>{(isAuth ? `Ei, @${nomeUsuario}.` : 'Ei, você!')}</span>
                <span className={Styles.tituloPrincipal}>Já conhece o&nbsp;<span className='cor-principal'>Anheu</span>?</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>O Anheu é uma plataforma de ensino de tecnologia.</span>
                <span className={Styles.descricaoTituloPrincipal}>Aqui você pode aprender hardware, software, clouding, gestão, BI, etc.</span>
                <span className={Styles.descricaoTituloPrincipal}>Seja muito bem-vind{usuarioGenero}. {EmojiAleatorio()}</span>
            </div>

            <div className={Styles.margemTopP}>
                {
                    isAuth ? (
                        <Link href='/disciplinas'>
                            <a className={Styles.link}>Veja suas disciplinas <Seta width={'1.9rem'} /></a>
                        </Link>
                    ) : (
                        <Link href='/usuario/entrar'>
                            <a className={Styles.link}>Entre agora mesmo <Seta width={'1.9rem'} /></a>
                        </Link>
                    )
                }
            </div>

            <div className={`${Styles.divMedia} ${Styles.margemTopG}`}>
                <video className={Styles.video} autoPlay loop muted playsInline disablePictureInPicture controls={false}>
                    <source src={Video1} type='video/mp4' />
                </video>
            </div>

            <div className={Styles.divCards}>
                <CardGrande
                    tituloInicial='Sem custo'
                    titulo='Posts & tutoriais'
                    subtitulo='Aprenda mais sobre o mundo da tecnologia com os posts & tutoriais do Anheu.
                               <br/><br/>É gratuito.
                               <br/>Não precisa criar uma conta, se não quiser.
                               <br/>Aprenda sempre mais.'
                    url=''
                />

                <CardGrande
                    tituloInicial='Conteúdo pago'
                    titulo='Cursos, disciplinas & aulas'
                    subtitulo='Aprenda mais ainda e seja um expert sobre o mundo da tecnologia com os cursos do Anheu.
                               <br/><br/>Preços baixos, alta aprendizagem. 
                               <br/>Crie sua conta e veja seu progresso.
                               <br/>Aprenda muito mais.'
                    url=''
                />
            </div>
        </section>
    )
}