import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import GifWait from '../../static/image/wait.gif';
import Styles from '../../styles/disciplinas.module.css';
import CONSTANTS_DISCIPLINAS from '../../utils/data/constDisciplinas';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';

export default function Disciplina({ isApiOk, disciplina }) {

    const [isPaginaCarregada, setIsPaginaCarregada] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = `${disciplina.nome} — Anheu`;
    }, []);

    return (
        <Fragment>
            {isApiOk === false ? (
                <section className={Styles.container} style={{ color: 'white' }}>
                    <div className={Styles.div}>
                        <span className={Styles.titulo}>Aguarde alguns segundos, por favor.</span>
                        <span className={Styles.textoNormal}>A API está off-line.</span>
                        <span className={Styles.textoNormal}>Ela está hospedada na Azure, em um plano gratuito, por isso é necessário aguardar um pouquinho no primeiro acesso! {EmojiAleatorio()}</span>

                        <div className={Styles.divImgWaiting}>
                            <Image src={GifWait} width={240} height={240} alt='' />
                        </div>
                    </div>
                </section>
            ) : (
                <section className={Styles.container}>
                    <h1>oi</h1>
                </section>
            )}
        </Fragment>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as disciplinas;
    const url = CONSTANTS_DISCIPLINAS.API_URL_GET_TODOS;
    const res = await fetch(url);
    const disciplinas = await res.json();

    // Gerar o "paths";
    const paths = disciplinas.map(d => ({
        params: { id: d.disciplinaId.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;
    let isApiOk = false;

    // Disciplina;
    const url1 = `${CONSTANTS_DISCIPLINAS.API_URL_GET_POR_ID}/${id}`;
    const res = await fetch(url1);
    const disciplina = await res.json();

    // isApiOk;
    isApiOk = true;

    return {
        props: {
            isApiOk,
            disciplina
        },
        // revalidate: 10 // segundos
    }
}
