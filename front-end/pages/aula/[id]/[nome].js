import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Aviso } from '../../../components/outros/aviso';
import BotaoAbsolute from '../../../components/outros/botaoAbsolute';
import thumbnailPadrao from '../../../static/image/iconeGrande.webp';
import Styles from '../../../styles/aula.module.css';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_AULAS from '../../../utils/data/constAulas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import tamanhoString from '../../../utils/outros/tamanhoString';

export default function Aula({ aula }) {
    //console.log(aula);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const [video, setVideo] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = `Anheu — Aula: ${aula.nome}`;

        async function getVideo() {
            NProgress.start();
            const nomePasta = 'aulas';
            const nomeSubpasta = 'video';
            const urlVideo = `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_VIDEO_PROTEGIDO}/nomePasta=${nomePasta}&nomeSubpasta=${nomeSubpasta}&nomeArquivo=${aula.video}`;
            // console.log(urlVideo);
            const token = Auth.getUsuarioLogado().token;
            const videoBase64 = await Fetch.getApi(urlVideo, token);
            console.log(`${videoBase64.item2} MS`);

            setVideo(videoBase64.item1);
            NProgress.done();
            Aviso.info(`Videoaula importada: ${tamanhoString(videoBase64)}`, 3000);
        }

        if (!video) {
            getVideo();
        }
    }, [aula, isAuth, video]);

    function handleClickNaoPermitirClickDireito(e) {
        if (e.type === 'click') {
            // console.log('Click esquerdo');
        } else if (e.type === 'contextmenu') {
            // console.log('Click direito');
            e.preventDefault(); // 'Bloquear' opções do click com o direito;
            return false;
        }
    }

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    return (
        <section className={Styles.wrapper}>
            <BotaoAbsolute textoBotao='&nbsp;&nbsp;Voltar' routerBack={() => Router.back()} isNovaAba={false} />

            <div className={Styles.divVideo}>
                <video
                    id='videoPlayer'
                    poster={thumbnailPadrao.src}
                    className={Styles.video}
                    loop={false}
                    playsInline
                    disablePictureInPicture
                    controls
                    controlsList='nodownload noplaybackrate'
                    onClick={(e) => handleClickNaoPermitirClickDireito(e)}
                    onContextMenu={(e) => handleClickNaoPermitirClickDireito(e)}
                >
                    {
                        video && (
                            <source src={video} type='video/mp4' />
                        )
                    }
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

    // Gerar o 'paths';
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
