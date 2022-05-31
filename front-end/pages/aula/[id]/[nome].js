import Router from 'next/router';
import NProgress from 'nprogress';
import Collapse from 'rc-collapse'; // https://www.npmjs.com/package/rc-collapse;
import 'rc-collapse/assets/index.css'; // https://www.npmjs.com/package/rc-collapse;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../../../components/outros/aviso';
import Botao from '../../../components/outros/botao';
import BotaoAbsolute from '../../../components/outros/botaoAbsolute';
import thumbnailPadrao from '../../../static/image/iconeGrande.webp';
import Styles from '../../../styles/aula.module.css';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_AULAS from '../../../utils/data/constAulas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';
import tamanhoString from '../../../utils/outros/tamanhoString';

export default function Aula({ aulaStaticProps }) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const Painelcollapsible = Collapse.Panel;
    const refVideo = useRef(null);
    const [objectFitStyleVideo, setObjectFitStyleVideo] = useState(true);

    const [aula, setAula] = useState({});
    useEffect(() => {
        // Gambiarra para parar de executar misteriosamente duas vezes o useEffect;
        if (aulaStaticProps?.aulaId) {
            setAula(aulaStaticProps);
        }
    }, [aulaStaticProps]);

    const [isLoaded, setIsLoaded] = useState(false);
    const [video, setVideo] = useState(null);
    useEffect(() => {
        async function getVideo() {
            NProgress.start();
            const nomePasta = 'aulas';
            const nomeSubpasta = 'video';
            const urlVideo = `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_VIDEO_PROTEGIDO}/nomePasta=${nomePasta}&nomeSubpasta=${nomeSubpasta}&nomeArquivo=${aula.video}`;
            const token = Auth.getUsuarioLogado().token;
            const videoBase64 = await Fetch.getApi(urlVideo, token);
            setVideo(videoBase64.item1);

            Aviso.info(`Videoaula de ${tamanhoString(videoBase64.item1)} importada em ${videoBase64.item2} milissegundos`, 3000);
            NProgress.done();
        }

        if (aula?.aulaId) {
            // Título da página;
            document.title = `Anheu — Aula: ${aulaStaticProps.nome}`;
            paginaCarregada(false, 200, 500, setIsLoaded);

            // "Baixar" a videoaula em questão;
            getVideo();
        }
    }, [aula]);

    function handleClickNaoPermitirClickDireito(e) {
        if (e.type === 'click') {
            // console.log('Click esquerdo');
        } else if (e.type === 'contextmenu') {
            // console.log('Click direito');
            e.preventDefault(); // 'Bloquear' opções do click com o direito;
            return false;
        }
    }

    function handleClickTimestamp(tempoEmSegundos) {
        // console.log(tempoEmSegundos);
        refVideo.current.currentTime = tempoEmSegundos;
        refVideo.current.play();
    }

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
                <video
                    style={{ objectFit: (objectFitStyleVideo ? 'cover' : 'contain') }}
                    ref={refVideo}
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
                <span className={Styles.topico}>{aula.nome}</span>
                <span className='tituloDesc'>{aula.resumoAula}</span>

                {
                    aula?.aulasTimings.length > 0 && (
                        <Collapse accordion={true} className='painelCollapse margem20'>
                            <Painelcollapsible header='Timestamps da aula'>
                                {
                                    aula?.aulasTimings?.map((at, i) => (
                                        <span key={i} className='textoTimestamps margem10' onClick={() => handleClickTimestamp(at.tempoEmSegundos)}>
                                            • {at.titulo}
                                        </span>
                                    ))
                                }
                            </Painelcollapsible>
                        </Collapse>
                    )
                }

                <div className='margem20' onClick={() => setObjectFitStyleVideo(!objectFitStyleVideo)}>
                    <Botao texto={'Alterar formato do vídeo'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                </div>
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
    const aulaStaticProps = await Fetch.getApi(url, null);

    return {
        props: {
            aulaStaticProps
        },
        // revalidate: 10 // segundos
    }
}
