import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import ImgCinza from '../../../static/image/cinza.webp';
import Styles from '../../../styles/aula.module.css';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_AULAS from '../../../utils/data/constAulas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import numeroAleatorio from '../../../utils/outros/numeroAleatorio';

export default function Aula({ aula }) {
    console.log(aula);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = `Anheu — Aula: ${aula.nome}`;

        NProgress.start();
        setTimeout(function () {
            setIsLoaded(true);
            NProgress.done();
        }, numeroAleatorio(200, 500));
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
            <div className={Styles.divVideo}>
                <video className={Styles.video} loop={false} playsInline disablePictureInPicture controls controlsList='nodownload noplaybackrate'>
                    <source src={(aula.video ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_VIDEO}/${aula.video}` : ImgCinza)} type='video/mp4' />
                </video>
            </div>

            <div className={Styles.divOutros}>
                <span className='topico'>{aula.nome}</span>
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
