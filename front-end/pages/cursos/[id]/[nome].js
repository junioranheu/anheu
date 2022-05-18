import React, { Fragment, useEffect, useState } from 'react';
import CursoRow from '../../../components/cursos/cursoRow';
import ModalComprarCurso from '../../../components/modal/modalComprarCurso';
import ModalWrapper from '../../../components/modal/_modalWrapper';
import Banner from '../../../components/outros/banner';
import Styles from '../../../styles/cursos.module.css';
import CONSTANTS_CURSOS from '../../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../../utils/data/constCursosCategorias';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';

export default function Curso({ cursos }) {
    // console.log(cursos);

    const [filtroCurso, setFiltroCurso] = useState('');
    useEffect(() => {
        // Título da página;
        document.title = cursos.length > 0 ? `Anheu — Cursos de ${cursos[0]?.cursosCategorias.categoria}` : 'Anheu';
    }, [cursos]);

    const [isModalComprarCursoOpen, setIsModalComprarCursoOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState({});
    function handleModalComprarCurso() {
        setIsModalComprarCursoOpen(!isModalComprarCursoOpen);
    }

    return (
        <Fragment>
            {/* Modal */}
            {
                isModalComprarCursoOpen && (
                    <ModalWrapper isOpen={isModalComprarCursoOpen} key={1}>
                        <ModalComprarCurso handleModal={() => handleModalComprarCurso()} cursoSelecionado={cursoSelecionado} />
                    </ModalWrapper>
                )
            }

            {/* Conteúdo */}
            {
                cursos.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
                        <div className='centralizarTexto'>
                            <span className='titulo'>Cursos de <span className='grifar'>{cursos[0]?.cursosCategorias.categoria}</span></span>
                        </div>

                        <div className='margem30'>
                            <input className={Styles.input} type='text' placeholder='Busque por um curso...' onChange={(e) => setFiltroCurso(e.target.value)} />
                        </div>

                        <div className='margem30'>
                            {
                                cursos?.filter(x => x.isAtivo === 1 && x.nome.toLowerCase().includes(filtroCurso)).map((c, i) => (
                                    <CursoRow
                                        key={i}
                                        curso={c}
                                        handleClick={() => { handleModalComprarCurso(), setCursoSelecionado(c) }}
                                        isMostrarPreco={true}
                                    />
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
    const cursos = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = cursos?.map(c => ({
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
    const cursos = await Fetch.getApi(url, null);

    return {
        props: {
            cursos
        },
        // revalidate: 10 // segundos
    }
}
