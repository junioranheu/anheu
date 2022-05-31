import React from 'react';
import Botao from '../../components/outros/botao.js';
import Video1 from '../../static/landingPage/1.mp4';
import Styles from '../../styles/index.module.css';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import CardGrande from '../outros/cardGrande.js';

export default function Sessao1({ isAuth, nomeUsuario, usuarioGenero }) {
    return (
        <section className={Styles.principal}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipal}>{(isAuth && nomeUsuario?.length > 0 ? `Ei, @${nomeUsuario}.` : 'Ei, você!')}</span>
                <span className={Styles.tituloPrincipal}>Já conhece o&nbsp;<span className='cor-principal'>Anheu</span>?</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>O Anheu é uma plataforma de ensino de tecnologia.</span>
                <span className={Styles.descricaoTituloPrincipal}>Aqui você pode aprender sobre software, hardware, clouding, gestão, BI, etc.</span>
                <span className={Styles.descricaoTituloPrincipal}>Seja muito bem-vind{usuarioGenero}. {EmojiAleatorio()}</span>
            </div>

            <div className={Styles.margemTopP}>
                {
                    isAuth ? (
                        <div className={Styles.botaoCustom}>
                            <Botao texto={'Assistir às aulas'} url={'/disciplinas'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>
                    ) : (
                        <div className={Styles.botaoCustom}>
                            <Botao texto={'Entre agora mesmo'} url={'/usuario/entrar'} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>
                    )
                }
            </div>

            <div className={`${Styles.divMedia} ${Styles.margemTopGG}`}>
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
        </section >
    )
}