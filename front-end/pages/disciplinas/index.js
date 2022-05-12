import Link from 'next/link';
import React, { Fragment } from 'react';
import CONSTANTS_DISCIPLINAS from '../../utils/data/constDisciplinas';

export default function Index({ disciplinas }) {
    // console.log(disciplinas);

    return (
        <Fragment>
            <div>
                <span className='titulo'>Disciplinas</span>
            </div>

            {disciplinas.filter(x => x.isAtivo === 1).map((d, i) => (
                <div key={i}>
                    <span className='topico'>
                        <Link href='/'>
                            <a className='cor-principal-hover'>{d.nome}</a>
                        </Link>
                    </span>

                    <span className='tituloDesc'>{d.subtitulo}</span>
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