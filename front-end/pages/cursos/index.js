import React, { useEffect } from 'react';
import Styles from '../../styles/cursos.module.css';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';

export default function Index({ cursos }) {
    // console.log(cursos);

    useEffect(() => {
        // Título da página;
        document.title = `Cursos — Anheu`;
    }, []);

    return (
        <section className='flexColumn'>
            <div style={{ textAlign: 'center' }}>
                <span className='titulo'>Cursos disponíveis no <span className='grifar'>Anheu</span></span>
            </div>

            <div className={`${Styles.margemTopP} ${Styles.divQuatroCards}`}>
                {cursos.filter(x => x.isAtivo === 1).map((c, i) => (
                    <section className={Styles.card}>
                        <div className={Styles.cardDivTexto}>
                            <span className={Styles.cardTitulo}>{c.nome}</span>
                            <span className={Styles.cardSubtitulo}>Professor {c.professor}</span>
                            <span className={Styles.cardTituloMenor}>R$ {c.preco}</span>
                            <span className={`${Styles.margemTopP} ${Styles.cardSubtitulo}`}>{c.resumoCurso}</span>
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