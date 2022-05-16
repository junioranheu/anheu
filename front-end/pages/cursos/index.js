import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import SessaoCardsPequenos from '../../components/outros/sessaoCardsPequenos';
import StylesCards from '../../styles/card.module.css';
import Styles from '../../styles/cursos.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../utils/data/constCursosCategorias';
import ConcatenarItensLista from '../../utils/outros/concatenarItensLista';

export default function Index({ cursos }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    // console.log(cursos);

    const [cursosCategorias, setCursosCategorias] = useState({});
    useEffect(() => {
        async function getCursosCategorias() {
            const url = CONSTANTS_CURSOS_CATEGORIAS.API_URL_GET_TODOS;
            const res = await fetch(url)
            const cursosCategorias = await res.json();
            console.log(cursosCategorias);
            setCursosCategorias(cursosCategorias);
        }

        // Título da página;
        document.title = `Cursos — Anheu`;

        getCursosCategorias();
    }, []);

    return (
        <section className={`flexColumn ${Styles.flexCenter}`}>
            {isAuth && (
                <Banner
                    titulo='Você já adquiriu algum curso?'
                    subtitulo='Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                    textoBotao='Visualizar e gerenciar meus cursos'
                    url='/usuario/meus-cursos'
                    isForcarFullscreen={false}
                />
            )}

            <div className={(isAuth ? Styles.margemTopG : '')}>
                <span className='titulo'>O que você quer estudar no <span className='grifar'>Anheu</span>?</span>
            </div>

            <SessaoCardsPequenos />

            <div className={`${Styles.margemTopP} ${Styles.divCards}`}>
                {cursos.filter(x => x.isAtivo === 1).map((c, i) => (
                    <section key={c.cursoId} className={StylesCards.card}>
                        <div className={StylesCards.cardDivTexto}>
                            <span className={StylesCards.cardTitulo}>{c.nome}</span>
                            <span className={StylesCards.cardSubtitulo}>Professor {c.professor}</span>
                            <span className={StylesCards.cardTituloMenor}>R$ {c.preco}</span>
                            <span className={`${Styles.margemTopP} ${StylesCards.cardSubtitulo} ${Styles.limitar4Linhas}`}>{c.resumoCurso}</span>
                            <span className={`${Styles.margemTopP} ${StylesCards.cardSubtitulo}`}>{ConcatenarItensLista(c.cursosDisciplinas, 'disciplinas.nome')}</span>
                        </div>
                    </section>
                ))}
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_CURSOS.API_URL_GET_TODOS;
    const res = await fetch(url)
    const cursos = await res.json();

    return {
        props: {
            cursos
        },
    }
}