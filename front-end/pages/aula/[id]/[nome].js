import Router from 'next/router';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import BotaoAbsolute from '../../../components/outros/botaoAbsolute';
import ImgCinza from '../../../static/image/cinza.webp';
import Styles from '../../../styles/aula.module.css';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_AULAS from '../../../utils/data/constAulas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Aula({ aula }) {
    // console.log(aula);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = `Anheu — Aula: ${aula.nome}`;

        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [aula]);

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={Styles.wrapper}>
            <BotaoAbsolute textoBotao='&nbsp;&nbsp;Voltar' routerBack={() => Router.back()} isNovaAba={false} />

            <div className={Styles.divVideo}>
                <video className={Styles.video} loop={false} playsInline disablePictureInPicture controls controlsList='nodownload noplaybackrate'>
                    <source src={(aula.video ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_VIDEO}/${aula.video}` : ImgCinza)} type='video/mp4' />
                </video>
            </div>

            <div className={Styles.divOutros}>
                <span className='topico'>{aula.nome}</span>
                <span className='tituloDesc'>{aula.resumoAula}</span>

                {
                    aula?.aulasTimings.length > 0 && (
                        <Fragment>
                            <br />
                            <span className='tituloDesc'>Timestamps:</span>
                            {
                                aula?.aulasTimings?.map((at, i) => (
                                    <span key={i} className='tituloDesc'>{at.titulo} - {at.tempoEmSegundos} segundos</span>
                                ))
                            }

                        </Fragment>
                    )
                }
            </div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as aulas;
    const url = CONSTANTS_AULAS.API_URL_GET_TODOS;
    const aulas = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = aulas?.map(d => ({
        params: {
            id: d.aulaId.toString(),
            nome: AjustarUrl(d.nome)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Aula;
    const url = `${CONSTANTS_AULAS.API_URL_GET_POR_ID}/${id}`;
    const aula = await Fetch.getApi(url, null);

    return {
        props: {
            aula
        },
        // revalidate: 10 // segundos
    }
}
