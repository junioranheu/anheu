import React from 'react';
import Imagem1 from '../../static/landingPage/imgSessao4img1.webp';
import Imagem2 from '../../static/landingPage/imgSessao4img2.webp';
import Imagem3 from '../../static/landingPage/imgSessao4img3.webp';
import Imagem4 from '../../static/landingPage/imgSessao4img4.webp';
import Styles from '../../styles/landingPage.module.css';
import Card from '../outros/card';

export default function Sessao4() {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipalMedio}>Descubra e aprenda coisas novas</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>Explore tudo que é possível ser feito no Anheu.</span>
            </div>

            <div className={`${Styles.margemTopP} ${Styles.divQuatroCards}`}>
                <Card Svg={''}
                    Img={Imagem1}
                    titulo='Crie seu próprio perfil'
                    subtitulo='E acompanhe seu progresso nas aulas, ganhando e acumulando conquistas.'
                    url='/xxx'
                />

                <Card Svg={''}
                    Img={Imagem2}
                    titulo='Suporte em tempo real'
                    subtitulo='Tire suas maiores e mais terríveis dúvidas com pessoas reais em tempo real!'
                    url='/xxx'
                />

                <Card Svg={''}
                    Img={Imagem4}
                    titulo='Só hardware?'
                    subtitulo='Não! Aprenda hardware, software, banco de dados, business inteligence, IA, design, e muito mais.'
                    url='/xxx'
                />

                <Card Svg={''}
                    Img={Imagem3}
                    titulo='Conhecimento nunca é demais'
                    subtitulo='"O sucesso é o troféu trazido pelo conhecimento", pense nisso, e aprenda cada vez mais.'
                    url='/xxx'
                />
            </div>
        </section>
    )
}
