import Link from 'next/link';
import Router from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import Styles from '../../styles/disciplinas.module.css';
import { CursoContext } from '../../utils/context/cursoContext';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';
import AjustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';

export default function Index() {
    // console.log(curso);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [cursoContext] = useContext(CursoContext); // Contexto do curso selecionado;
    const [cursoData, setCursoData] = useState({});

    useEffect(() => {
        async function getCurso() {
            console.log(cursoContext);

            const url = `${CONSTANTS_CURSOS.API_URL_GET_POR_ID}/1`;
            const curso = await Fetch.getApi(url, null);

            setCursoData(curso);
        }

        // Título da página;
        document.title = `Disciplinas — Anheu`;

        // Pegar informações do curso com base do id que está em cursoContext;
        if (cursoContext) {
            getCurso();
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
        Router.push('/404');
        return false;
    }

    return (
        <Fragment>
            {
                cursoContext && cursoData?.cursosDisciplinas?.length > 0 ? (
                    <section className='flexColumn'>
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
                                    <div onClick={() => Router.push(`/disciplinas/${d.disciplinas.disciplinaId}/${AjustarUrl(d.disciplinas.nome)}`)}>
                                        {exibirTags(d.disciplinas.disciplinaTags)}
                                    </div>
                                </div>
                            ))
                        }

                        {/* Espaço a mais */}
                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    <Banner
                        titulo='Você já adquiriu algum curso?'
                        subtitulo='Parece que você não selecionou nenhum curso ainda.<br/>Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                        textoBotao='Visualizar e gerenciar meus cursos'
                        url='/usuario/meus-cursos'
                        isForcarFullscreen={true}
                    />
                )
            }
        </Fragment>
    )
}
