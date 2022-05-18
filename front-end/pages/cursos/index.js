import React, { useContext, useEffect, useState } from 'react';
import Banner from '../../components/outros/banner';
import SessaoCardsPequenos from '../../components/outros/sessaoCardsPequenos';
import Styles from '../../styles/cursos.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_CURSOS from '../../utils/data/constCursos';
import CONSTANTS_CURSOS_CATEGORIAS from '../../utils/data/constCursosCategorias';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import { Fetch } from '../../utils/outros/fetch';

export default function Index({ cursos }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    // console.log(cursos);

    const [cursosCategorias, setCursosCategorias] = useState({});
    useEffect(() => {
        async function getCursosCategorias() {
            const url = CONSTANTS_CURSOS_CATEGORIAS.API_URL_GET_TODOS;
            const cursosCategorias = await Fetch.getApi(url, null);

            // Criar novo objeto com campos especificos;
            var obj = [{}];
            cursosCategorias.forEach(function (c, i) {
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

        // Título da página;
        document.title = 'Anheu — Cursos';

        getCursosCategorias();
    }, []);

    return (
        <section className={`flexColumn ${Styles.flexCenter}`}>
            {
                isAuth && (
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

            <div className='margem50'>
                <SessaoCardsPequenos lista={cursosCategorias} rota={'cursos'} />
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_CURSOS.API_URL_GET_TODOS;
    const cursos = await Fetch.getApi(url, null);

    return {
        props: {
            cursos
        },
    }
}