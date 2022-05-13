import React, { useEffect } from 'react';
import CardGigante from '../../components/outros/cardGigante';
import StylesCards from '../../styles/card.module.css';
import Styles from '../../styles/cursos.module.css';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';

export default function Index({ cursos }) {
    // console.log(cursos);

    useEffect(() => {
        // Título da página;
        document.title = `Cursos — Anheu`;
    }, []);

    return (
        <section className={`flexColumn ${Styles.flexCenter}`}>
            <CardGigante
                titulo='Você já adquiriu algum curso?'
                subtitulo='Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                textoBotao='Visualizar e gerenciar meus cursos'
                url='/usuario/meus-cursos'
            />

            <div className={Styles.margemTopG}>
                <span className='titulo'>Cursos disponíveis no <span className='grifar'>Anheu</span></span>
            </div>

            <div className={`${Styles.margemTopP} ${Styles.divQuatroCards}`}>
                {cursos.filter(x => x.isAtivo === 1).map((c, i) => (
                    <section key={c.cursoId} className={StylesCards.card}>
                        <div className={StylesCards.cardDivTexto}>
                            <span className={StylesCards.cardTitulo}>{c.nome}</span>
                            <span className={StylesCards.cardSubtitulo}>Professor {c.professor}</span>
                            <span className={StylesCards.cardTituloMenor}>R$ {c.preco}</span>
                            <span className={`${Styles.margemTopP} ${StylesCards.cardSubtitulo}`}>{c.resumoCurso}</span>
                        </div>
                    </section>
                ))}
            </div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_CURSOS.API_URL_GET_TODOS;
    const res = await fetch(url)
    const cursos = await res.json();

    return {
        props: {
            cursos
        },
    }
}