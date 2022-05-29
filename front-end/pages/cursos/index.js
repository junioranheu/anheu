import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import SessaoCardsPequenos from '../../components/outros/sessaoCardsPequenos';
import Styles from '../../styles/cursos.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_CURSOS_CATEGORIAS from '../../utils/data/constCursosCategorias';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Index({ cc }) {
    document.title = 'Anheu — Cursos';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    // console.log(cursos);

    const [cursosCategorias, setCursosCategorias] = useState({});
    const [qtdUsuarioCursos, setQtdUsuarioCursos] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function ajustarCursosCategorias(cc) {
            // Criar novo objeto com campos especificos;
            var obj = [{}];
            cc.forEach(function (c, i) {
                const o = {
                    id: c.cursoCategoriaId,
                    titulo: c.categoria,
                    desc: (c.qtdCursos === 1 ? '1 curso' : `${c.qtdCursos} cursos`),
                    imagem: `${CONSTANTS_UPLOAD.API_URL_GET_CURSOS_CATEGORIAS}/${c.imagem}`
                }

                obj[i] = o;
            });

            // console.log(obj);
            setCursosCategorias(obj);
        }

        async function getQtdUsuarioCursos() {
            const usuarioId = Auth?.getUsuarioLogado()?.usuarioId;
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_POR_USUARIO_ID}/${usuarioId}`;
            const usuarioCursos = await Fetch.getApi(url, null);
            setQtdUsuarioCursos(usuarioCursos.length);

            paginaCarregada(true, 200, 500, setIsLoaded);
        }

        // Ajustar as categorias com base no que vem do getStaticProps;
        ajustarCursosCategorias(cc);

        // Qtd de cursos do usuário logado;
        if (isAuth) {
            getQtdUsuarioCursos();
        } else {
            paginaCarregada(true, 200, 500, setIsLoaded);
        }
    }, [cc]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={`flexColumn ${Styles.flexCenter}`}>
            {
                isAuth && qtdUsuarioCursos > 0 && (
                    <Banner
                        titulo='Você já adquiriu algum curso?'
                        subtitulo='Gerencie seus cursos para assistir às outras aulas, sem perder seu progresso 🙃'
                        textoBotao='Visualizar e gerenciar meus cursos'
                        url='/usuario/meus-cursos'
                        isForcarFullscreen={false}
                    />
                )
            }

            <div className={`margem50 ${Styles.centralizar}`}>
                <span className='titulo'>O que você quer estudar no <span className='grifar'>Anheu</span>?</span>
            </div>

            <div className='margem50 animate__animated animate__fadeIn delay03'>
                <SessaoCardsPequenos lista={cursosCategorias} rota={'cursos'} />
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_CURSOS_CATEGORIAS.API_URL_GET_TODOS;
    const cc = await Fetch.getApi(url, null);

    return {
        props: {
            cc
        },
    }
}