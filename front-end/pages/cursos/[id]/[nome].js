import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import ImgCinza from '../../../static/image/cinza.webp';
import Styles from '../../../styles/cursos.module.css';
import CONSTANTS_CURSOS from '../../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../../utils/data/constCursosCategorias';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';

export default function Curso({ cursos }) {
    console.log(cursos);

    useEffect(() => {
        // Título da página;
        document.title = `${cursos.nome} — Anheu`;
    }, []);

    return (
        <section className='flexColumn'>
            <div className='flexColumn'>
                <span className='titulo'>Bem-vindo xxxxxxx de <span className='grifar'>{cursos.nome}</span></span>
            </div>

            <div className='margem30'>
                {cursos.aulas.filter(x => x.isAtivo === 1).map((d, i) => (
                    <div key={i} className={`${Styles.divAula} margem5`}>
                        <span className={Styles.topico}>
                            <Link href={`/cursos/${d.disciplinaId}`}>
                                <a className='cor-principal-hover'>{d.nome}</a>
                            </Link>
                        </span>

                        <div className={`${Styles.flexMeio} margem10`}>
                            <div>
                                <Image
                                    className={Styles.thumb}
                                    src={(d.thumbnail ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_THUMBNAIL}/${d.thumbnail}` : ImgCinza)}
                                    width={500} height={500}
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

    // Todas as cursos;
    const url = CONSTANTS_CURSOS_CATEGORIAS.API_URL_GET_TODOS;
    const res = await fetch(url);
    const cursos = await res.json();

    // Gerar o "paths";
    const paths = cursos.map(c => ({
        params: {
            id: c.cursoCategoriaId.toString(),
            nome: AjustarUrl(c.categoria)
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
    const url = `${CONSTANTS_CURSOS.API_URL_GET_POR_CURSO_CATEGORIA_ID}/${id}`;
    const res = await fetch(url);
    const cursos = await res.json();

    return {
        props: {
            cursos
        },
        // revalidate: 10 // segundos
    }
}
