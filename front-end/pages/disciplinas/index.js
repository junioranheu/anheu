import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useEffect } from 'react';
import Styles from '../../styles/disciplinas.module.css';
import CONSTANTS_DISCIPLINAS from '../../utils/data/constDisciplinas';

export default function Index({ disciplinas }) {
    // console.log(disciplinas);

    useEffect(() => {
        // Título da página;
        document.title = `Disciplinas — Anheu`;
    }, []);

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
            <div>
                <span className='titulo'>Disciplinas</span>
            </div>

            {disciplinas.filter(x => x.isAtivo === 1).map((d, i) => (
                <div key={i}>
                    <span className='topico'>
                        <Link href={`/disciplinas/${d.disciplinaId}`}>
                            <a className='cor-principal-hover'>{d.nome}</a>
                        </Link>
                    </span>

                    <span className='tituloDesc'>{d.subtitulo}</span>
                    <div onClick={() => Router.push(`/disciplinas/${d.disciplinaId}`)}>{exibirTags(d.disciplinaTags)}</div>
                </div>
            ))}
        </Fragment>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_DISCIPLINAS.API_URL_GET_TODOS;
    const res = await fetch(url)
    const disciplinas = await res.json();

    return {
        props: {
            disciplinas
        },
    }
}