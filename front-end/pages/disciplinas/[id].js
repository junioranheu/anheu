import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect } from 'react';
import ImgCinza from '../../static/image/cinza.webp';
import Styles from '../../styles/disciplinas.module.css';
import CONSTANTS_DISCIPLINAS from '../../utils/data/constDisciplinas';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';

export default function Disciplina({ isApiOk, disciplina }) {
    console.log(disciplina);

    useEffect(() => {
        // Título da página;
        document.title = `${disciplina.nome} — Anheu`;
    }, []);

    return (
        <Fragment>
            {isApiOk === false ? (
                <section className={Styles.flex}>
                    <span className={Styles.titulo}>Aguarde alguns segundos, por favor.</span>
                    <span className={Styles.textoNormal}>A API está off-line.</span>
                    <span className={Styles.textoNormal}>Ela está hospedada na Azure, em um plano gratuito, por isso é necessário aguardar um pouquinho no primeiro acesso! {EmojiAleatorio()}</span>
                </section>
            ) : (
                <section>
                    <div>
                        <span className='titulo'>{disciplina.nome}</span>
                        <span className='tituloDesc'>Professor {disciplina.aulas[0].professor}</span>
                    </div>

                    {disciplina.aulas.filter(x => x.isAtivo === 1).map((d, i) => (
                        <div key={i}>
                            <span className='topico'>
                                <Link href={`/disciplinas/${d.disciplinaId}`}>
                                    <a className='cor-principal-hover'>{d.nome}</a>
                                </Link>
                            </span>

                            <div>
                                {console.log(`${CONSTANTS_UPLOAD.API_URL_GET_AULAS_THUMBNAIL}/${d.thumbnail}`)}
                                <Image src={(d.thumbnail ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_THUMBNAIL}/${d.thumbnail}` : ImgCinza)} width={240} height={240} />
                            </div>

                            <span className='tituloDesc'>{d.resumoAula}</span>
                        </div>
                    ))}
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
    // console.log(disciplinas);

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
    const url = `${CONSTANTS_DISCIPLINAS.API_URL_GET_POR_ID}/${id}`;
    const res = await fetch(url);
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
