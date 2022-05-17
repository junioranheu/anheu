import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ImgCinza from '../../../static/image/cinza.webp';
import Styles from '../../../styles/disciplinas.module.css';
import CONSTANTS_DISCIPLINAS from '../../../utils/data/constDisciplinas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';

export default function Disciplina({ disciplina }) {
    // console.log(disciplina);

    useEffect(() => {
        // Título da página;
        document.title = `${disciplina.nome} — Anheu`;
    }, [disciplina]);

    return (
        <section className='flexColumn'>
            <div className='flexColumn'>
                <span className='titulo'>Bem-vindo às aulas de <span className='grifar'>{disciplina.nome}</span></span>
            </div>

            <div className='margem30'>
                {disciplina.aulas.filter(x => x.isAtivo === 1).map((d, i) => (
                    <div key={i} className={`${Styles.divAula} margem5`}>
                        <span className={Styles.topico}>
                            <Link href={`/disciplinas/${d.disciplinaId}`}>
                                <a className='cor-principal-hover'>{d.nome}</a>
                            </Link>
                        </span>

                        <div className={`${Styles.flexMeio} margem10`}>
                            <div>
                                <Image
                                    className={Styles.thumb}
                                    src={(d.thumbnail ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_THUMBNAIL}/${d.thumbnail}` : ImgCinza)}
                                    width={500} 
                                    height={500}
                                    alt=''
                                />
                            </div>

                            <div>
                                <span className={`${Styles.textoHoverDivAula} texto`}>{d.resumoAula}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as disciplinas;
    const url = CONSTANTS_DISCIPLINAS.API_URL_GET_TODOS;
    const res = await fetch(url);
    const disciplinas = await res.json();
    // console.log(disciplinas);

    // Gerar o "paths";
    const paths = disciplinas.map(d => ({
        params: {
            id: d.disciplinaId.toString(),
            nome: AjustarUrl(d.nome)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Disciplina;
    const url = `${CONSTANTS_DISCIPLINAS.API_URL_GET_POR_ID}/${id}`;
    const res = await fetch(url);
    const disciplina = await res.json();

    return {
        props: {
            disciplina
        },
        // revalidate: 10 // segundos
    }
}
