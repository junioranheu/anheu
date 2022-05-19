import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import Styles from '../../styles/disciplinas.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import AjustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';

export default function Index() {
    // console.log(curso);
    document.title = 'Anheu — Disciplinas';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;
    const usuarioNome = isAuth ? Auth?.getUsuarioLogado()?.nome : 'Olá';

    const [cursoDefinidoAtual, setCursoDefinidoAtual] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [qtdUsuarioCursos, setQtdUsuarioCursos] = useState(0);
    useEffect(() => {
        async function getCursoDefinidoAtual() {
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_CURSO_DEFINIDO_ATUAL_POR_USUARIO_ID}/${usuarioId}`;
            const cursoDefinido = await Fetch.getApi(url, null);
            setCursoDefinidoAtual(cursoDefinido);
        }

        async function getQtdUsuarioCursos() {
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_POR_USUARIO_ID}/${usuarioId}`;
            const usuarioCursos = await Fetch.getApi(url, null);
            setQtdUsuarioCursos(usuarioCursos.length);
            setIsLoaded(true);
        }

        // Verificar qual é o curso definido como atual pelo usuário;
        getCursoDefinidoAtual();

        // Qtd de cursos do usuário logado;
        if (isAuth) {
            getQtdUsuarioCursos();
        } else {
            setIsLoaded(true);
        }
    }, [cursoDefinidoAtual?.cursoId]);

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
                cursoDefinidoAtual?.cursoId > 0 && cursoDefinidoAtual?.cursosDisciplinas?.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
                        <div>
                            <span className='titulo'>Disciplinas do curso <span className='grifar'>{cursoDefinidoAtual?.nome}</span></span>
                        </div>

                        {
                            cursoDefinidoAtual?.cursosDisciplinas?.filter(x => x.isAtivo === 1).map((d, i) => (
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
                            titulo={`${usuarioNome}, você já adquiriu um curso!`}
                            subtitulo='Mas... parece que você não definiu nenhum curso como atual ainda.<br/>Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                            textoBotao='Visualizar e gerenciar meus cursos'
                            url='/usuario/meus-cursos'
                            isForcarFullscreen={true}
                        />
                    ) : (
                        <Banner
                            titulo={`${usuarioNome}, parece que você ainda não não adquiriu nenhum curso`}
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
