import React from 'react';
import Imagem1 from '../../static/landingPage/imgSessao4img1.webp';
import Imagem2 from '../../static/landingPage/imgSessao4img2.webp';
import Imagem3 from '../../static/landingPage/imgSessao4img3.webp';
import Imagem4 from '../../static/landingPage/imgSessao4img4.webp';
import Styles from '../../styles/index.module.css';
import Card from '../outros/card';

export default function Sessao4() {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipalMedio}>Crie seu código</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>Explore tudo que é possível ser feito com o Framer.</span>
            </div>

            <div className={`${Styles.margemTopP} ${Styles.divQuatroCards}`}>
                <Card Svg={''}
                    Img={Imagem1}
                    titulo='Reconhecimento facial'
                    subtitulo='Aprenda mais sobre os recursos e comece explorando alguns exemplos interativos.'
                    url='/docs/introducao'
                />

                <Card Svg={''}
                    Img={Imagem2}
                    titulo='Dados reais'
                    subtitulo='Aprenda mais sobre os recursos e comece explorando alguns exemplos interativos.'
                    url='/docs/introducao'
                />

                <Card Svg={''}
                    Img={Imagem3}
                    titulo='Integração fácil'
                    subtitulo='Aprenda mais sobre os recursos e comece explorando alguns exemplos interativos.'
                    url='/docs/introducao'
                />

                <Card Svg={''}
                    Img={Imagem4}
                    titulo='Arduíno'
                    subtitulo='Aprenda mais sobre os recursos e comece explorando alguns exemplos interativos.'
                    url='/docs/introducao'
                />
            </div>
        </section>
    )
}
