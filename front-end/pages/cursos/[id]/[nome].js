import React, { Fragment, useContext, useEffect, useState } from 'react';
import ModalComprarCurso from '../../../components/modal/modalComprarCurso';
import ModalWrapper from '../../../components/modal/_modalWrapper';
import Banner from '../../../components/outros/banner';
import ItemRow from '../../../components/outros/itemRow';
import Styles from '../../../styles/cursos.module.css';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_CURSOS from '../../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../../utils/data/constCursosCategorias';
import CONSTANTS_USUARIOS_CURSOS from '../../../utils/data/constUsuariosCursos';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Curso({ cursos }) {
    // console.log(cursos);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [filtroCurso, setFiltroCurso] = useState('');
    const [cursoDefinidoAtual, setCursoDefinidoAtual] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function getCursoDefinidoAtual() {
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_CURSO_DEFINIDO_ATUAL_POR_USUARIO_ID}/${usuarioId}`;
            const cursoDefinido = await Fetch.getApi(url, null);
            // console.log(cursoDefinido);

            setCursoDefinidoAtual(cursoDefinido);

            paginaCarregada(true, 200, 500, setIsLoaded);
        }

        // Título da página;
        document.title = cursos.length > 0 ? `Anheu — Cursos de ${cursos[0]?.cursosCategorias.categoria}` : 'Anheu';

        // Verificar qual é o curso definido como atual pelo usuário;
        getCursoDefinidoAtual();
    }, [cursos]);

    const [isModalComprarCursoOpen, setIsModalComprarCursoOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState({});
    function handleModalComprarCurso() {
        setIsModalComprarCursoOpen(!isModalComprarCursoOpen);
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            {
                // Modal
                isModalComprarCursoOpen && (
                    <ModalWrapper isOpen={isModalComprarCursoOpen} key={1}>
                        <ModalComprarCurso handleModal={() => handleModalComprarCurso()} cursoSelecionado={cursoSelecionado} />
                    </ModalWrapper>
                )
            }

            {
                // Conteúdo
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
                                cursos?.filter(x => x.isAtivo === 1 && x.nome.toLowerCase().includes(filtroCurso.toLowerCase())).map((c, i) => (
                                    <ItemRow
                                        key={i}
                                        data={c}
                                        id={c.cursoId}
                                        titulo={c.nome}
                                        descricao={c.resumoCurso}
                                        itemzinho={`Professor ${c.professor}`}
                                        itemzao={`R$ ${c.preco}`}
                                        isMostrarItemzao={true}
                                        handleClick={() => { handleModalComprarCurso(), setCursoSelecionado(c) }}
                                        idReferenciaParaAlterarCor={cursoDefinidoAtual?.cursoId}
                                        tags={null}
                                        imagem={null}
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
