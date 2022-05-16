import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Styles from '../../styles/disciplinas.module.css';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';
import AjustarUrl from '../../utils/outros/ajustarUrl';

export default function Index({ curso }) {
    // console.log(curso);
    const [cursoData, setCursoData] = useState({});

    useEffect(() => {
        // Título da página;
        document.title = `Disciplinas — Anheu`;

        setCursoData(curso);
    }, [curso]);

    function exibirTags(disciplinaTags) {
        let tags = '';
        disciplinaTags.forEach(function (d, index) {
            // console.log(d);
            tags += `<span class='tag' key='${d.disciplinaTagId}'}>${d.tag}</span>`;
        });

        return (
            <div className={Styles.divTags} dangerouslySetInnerHTML={{ __html: tags }}></div>
        )
    }

    return (
        <Fragment>
            {
                cursoData?.cursosDisciplinas?.length > 0 ? (
                    <section className='flexColumn'>
                        <div>
                            <span className='titulo'>Disciplinas do curso <span className='grifar'>{cursoData?.nome}</span></span>
                        </div>

                        {
                            cursoData?.cursosDisciplinas?.filter(x => x.isAtivo === 1).map((d, i) => (
                                <div key={i} className='flexColumn margem40'>
                                    <span className='topico' style={{ width: 'fit-content' }}>
                                        <Link href={`/disciplinas/${d.disciplinas.disciplinaId}/${AjustarUrl(d.disciplinas.nome)}`}>
                                            <a className='cor-principal-hover'>{d.disciplinas.nome}</a>
                                        </Link>
                                    </span>

                                    <span className='tituloDesc'>{d.disciplinas.subtitulo}</span>
                                    <div onClick={() => Router.push(`/disciplinas/${d.disciplinas.disciplinaId}/${AjustarUrl(d.disciplinas.nome)}`)}>
                                        {exibirTags(d.disciplinas.disciplinaTags)}
                                    </div>
                                </div>
                            ))
                        }

                        {/* Espaço a mais */}
                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    <section>
                        aea
                    </section>
                )
            }
        </Fragment>
    )
}

export async function getStaticProps() {
    const url = `${CONSTANTS_CURSOS.API_URL_GET_POR_ID}/1`;
    const res = await fetch(url)
    const curso = await res.json();

    return {
        props: {
            curso
        },
    }
}