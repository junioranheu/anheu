import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import Styles from '../../styles/disciplinas.module.css';
import { CursoContext } from '../../utils/context/cursoContext';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import AjustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';

export default function Index() {
    // console.log(curso);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [cursoContext] = useContext(CursoContext); // Contexto do curso selecionado;
    const [cursoData, setCursoData] = useState({});

    const [isLoaded, setIsLoaded] = useState(false);
    const [qtdUsuarioCursos, setQtdUsuarioCursos] = useState(0);
    useEffect(() => {
        async function getCurso() {
            const url = `${CONSTANTS_CURSOS.API_URL_GET_POR_ID}/${cursoContext}`;
            const curso = await Fetch.getApi(url, null);

            setCursoData(curso);
            setIsLoaded(true);
        }

        async function getQtdUsuarioCursos() {
            const usuarioId = Auth?.getUsuarioLogado()?.usuarioId;
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_POR_USUARIO_ID}/${usuarioId}`;
            const usuarioCursos = await Fetch.getApi(url, null);
            setQtdUsuarioCursos(usuarioCursos.length);
        }

        // Título da página;
        document.title = 'Anheu — Disciplinas';

        // Pegar informações do curso com base do id que está em cursoContext;
        if (cursoContext) {
            getCurso();
        } else {
            setIsLoaded(true);
        }

        // Qtd de cursos do usuário logado;
        if (isAuth) {
            getQtdUsuarioCursos();
        }
    }, [cursoContext]);

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

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            {
                cursoContext && cursoData?.cursosDisciplinas?.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
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
                                    <div
                                        style={{ width: 'fit-content' }}
                                        onClick={() => Router.push(`/disciplinas/${d.disciplinas.disciplinaId}/${AjustarUrl(d.disciplinas.nome)}`)}
                                    >
                                        {exibirTags(d.disciplinas.disciplinaTags)}
                                    </div>
                                </div>
                            ))
                        }

                        {/* Espaço a mais */}
                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    qtdUsuarioCursos > 0 ? (
                        <Banner
                            titulo='Você já adquiriu algum curso?'
                            subtitulo='Parece que você não selecionou nenhum curso ainda.<br/>Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                            textoBotao='Visualizar e gerenciar meus cursos'
                            url='/usuario/meus-cursos'
                            isForcarFullscreen={true}
                        />
                    ) : (
                        <Banner
                            titulo='Parece que você ainda não não adquiriu nenhum curso'
                            subtitulo='Visualize os cursos disponíveis aqui no Anheu e adquira um agora mesmo! 🙃'
                            textoBotao='Visualizar cursos'
                            url='/cursos'
                            isForcarFullscreen={true}
                        />
                    )
                )
            }
        </Fragment>
    )
}
