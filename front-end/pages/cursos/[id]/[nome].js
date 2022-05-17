import React, { Fragment, useEffect, useState } from 'react';
import Banner from '../../../components/outros/banner';
import Styles from '../../../styles/cursos.module.css';
import CONSTANTS_CURSOS from '../../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../../utils/data/constCursosCategorias';
import AjustarUrl from '../../../utils/outros/ajustarUrl';

export default function Curso({ cursos }) {
    // console.log(cursos);

    const [filtroCurso, setFiltroCurso] = useState('');
    useEffect(() => {
        // Título da página;
        document.title = cursos.length > 0 ? `${cursos[0]?.cursosCategorias.categoria} — Anheu` : 'Anheu';
    }, []);

    return (
        <Fragment>
            {
                cursos.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
                        <div style={{textAlign: 'center'}}>
                            <span className='titulo'>Cursos de <span className='grifar'>{cursos[0]?.cursosCategorias.categoria}</span></span>
                        </div>

                        <div className='margem30'>
                            <input className={Styles.input} type='text' placeholder='Busque por um curso...' onChange={(e) => setFiltroCurso(e.target.value)} />
                        </div>

                        <div className='margem30'>
                            {
                                cursos.filter(x => x.isAtivo === 1 && x.nome.toLowerCase().includes(filtroCurso)).map((c, i) => (
                                    <div key={i} className={`${Styles.divCurso} margem5`}>
                                        <span className={Styles.topico}>{c.nome}</span>

                                        <div className={`${Styles.divDescCurso} margem10`}>
                                            <span className='texto'>{c.resumoCurso}</span>
                                            <span className='texto'>R$ {c.preco}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Espaço a mais */}
                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    <Banner
                        titulo='Opa...'
                        subtitulo='Parece que ainda não existe nenhum curso nessa categoria'
                        textoBotao='Visualizar outras categorias'
                        url='/cursos'
                        isForcarFullscreen={true}
                    />
                )
            }
        </Fragment>
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
