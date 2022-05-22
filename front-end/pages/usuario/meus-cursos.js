import Router from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import ModalSelecionarCurso from '../../components/modal/modalSelecionarCurso';
import ModalWrapper from '../../components/modal/_modalWrapper';
import Banner from '../../components/outros/banner';
import ItemRow from '../../components/outros/itemRow';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';

export default function MeusCursos() {
    document.title = 'Anheu — Meus cursos';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [isLoaded, setIsLoaded] = useState(false);
    const [meusCursos, setMeusCursos] = useState({});
    const [cursoDefinidoAtual, setCursoDefinidoAtual] = useState({});

    async function getCursoDefinidoAtual() {
        const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_CURSO_DEFINIDO_ATUAL_POR_USUARIO_ID}/${usuarioId}`;
        const cursoDefinido = await Fetch.getApi(url, null);
        // console.log(cursoDefinido);

        setCursoDefinidoAtual(cursoDefinido);

        setTimeout(function () {
            setIsLoaded(true);
        }, 200);
    }

    useEffect(() => {
        async function getUsuarioCursos() {
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_POR_USUARIO_ID}/${usuarioId}`;
            const cursos = await Fetch.getApi(url, null);
            setMeusCursos(cursos);
        }

        // Meus cursos;
        if (usuarioId) {
            getUsuarioCursos();
            getCursoDefinidoAtual();
        }
    }, [usuarioId]);

    const [isModalCursoOpen, setIsModalCursoOpen] = useState(false);
    const [cursoSelecionado, setCursoSelecionado] = useState({});
    function handleModalCurso() {
        setIsModalCursoOpen(!isModalCursoOpen);
    }

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            {/* Modal */}
            {
                isModalCursoOpen && (
                    <ModalWrapper isOpen={isModalCursoOpen} key={1}>
                        <ModalSelecionarCurso handleModal={() => handleModalCurso()} cursoSelecionado={cursoSelecionado} getCursoDefinidoAtual={getCursoDefinidoAtual} />
                    </ModalWrapper>
                )
            }

            {/* Conteúdo */}
            {
                meusCursos && meusCursos?.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
                        <div className='centralizarTexto flexColumn'>
                            <span className='titulo'>Meus cursos</span>
                            <span className='tituloDesc'>Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃</span>
                        </div>

                        <div className='margem30'>
                            {
                                meusCursos?.length > 0 && (
                                    meusCursos?.filter(x => x.isAtivo === 1).map((c, i) => (
                                        <ItemRow
                                            key={i}
                                            data={c.cursos}
                                            id={c.cursos.cursoId}
                                            titulo={c.cursos.nome}
                                            descricao={c.cursos.resumoCurso}
                                            itemzinho={`Professor ${c.cursos.professor}`}
                                            itemzao={`R$ ${c.cursos.preco}`}
                                            isMostrarItemzao={false}
                                            handleClick={() => { handleModalCurso(), setCursoSelecionado(c.cursos) }}
                                            idReferenciaParaAlterarCor={cursoDefinidoAtual?.cursoId}
                                            tags={null}
                                            imagem={null}
                                        />
                                    ))
                                )
                            }
                        </div>

                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    <Banner
                        titulo='Parece que você ainda não não adquiriu nenhum curso'
                        subtitulo='Visualize os cursos disponíveis aqui no Anheu e adquira um agora mesmo! 🙃'
                        textoBotao='Visualizar cursos'
                        url='/cursos'
                        isForcarFullscreen={false}
                    />
                )
            }
        </Fragment>
    )
}

