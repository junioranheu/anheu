import Router from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import Banner from '../../../../components/outros/banner';
import InputFiltro from '../../../../components/outros/inputFiltro';
import ItemRow from '../../../../components/outros/itemRow';
import CONSTANTS_POSTS from '../../../../utils/data/constPosts';
import CONSTANTS_POSTS_CATEGORIAS from '../../../../utils/data/constPostsCategorias';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import diferencaEmHoras from '../../../../utils/outros/diferencaEmHoras';
import diferencaEmSegundos from '../../../../utils/outros/diferencaEmSegundos';
import { Fetch } from '../../../../utils/outros/fetch';
import horarioBrasilia from '../../../../utils/outros/horarioBrasilia';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';
import segundosParaDHMS from '../../../../utils/outros/segundosParaDHMS';

export default function Post({ posts }) {
    // console.log(posts);

    const [filtroCurso, setFiltroCurso] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = (posts.length ? `Anheu — Posts sobre ${posts[0].postsCategorias?.categoria.toLowerCase()}` : 'Anheu — Posts & tutoriais');
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [posts]);

    if (!isLoaded) {
        return false;
    }

    return (
        <Fragment>
            {
                posts.length > 0 ? (
                    <section className='flexColumn paddingPadrao margem50'>
                        <div className='centralizarTexto'>
                            <span className='titulo'>Posts sobre <span className='grifar'>{posts[0]?.postsCategorias.categoria.toLowerCase()}</span></span>
                        </div>

                        <div className='margem30'>
                            <InputFiltro placeholder='Busque por um post...' filtrar={setFiltroCurso} />
                        </div>

                        <div className='margem30'>
                            {
                                posts?.filter(x => x.isAtivo === 1 && x.titulo.toLowerCase().includes(filtroCurso.toLowerCase())).map((p, i) => (
                                    <ItemRow
                                        key={i}
                                        data={p}
                                        id={p.postId}
                                        titulo={p.titulo}
                                        descricao={`Postado por @${p?.usuarios?.nomeUsuarioSistema}, ${segundosParaDHMS(diferencaEmSegundos(horarioBrasilia(), p.dataRegistro))}`}
                                        itemzinho={(diferencaEmHoras(horarioBrasilia(), p.dataRegistro) <= 48 ? 'Novo post' : '')}
                                        itemzao={null}
                                        isMostrarItemzao={false}
                                        handleClick={() => Router.push(`/posts/${p.postId}/${ajustarUrl(p.titulo)}`)}
                                        idReferenciaParaAlterarCor={null}
                                        tags={null}
                                        imagem={null}
                                    />
                                ))
                            }
                        </div>

                        {/* Espaço a mais */}
                        <div className='espacoBottom'></div>
                    </section>
                ) : (
                    <Banner
                        titulo='Opa...'
                        subtitulo='Parece que ainda não existe nenhum post nessa categoria'
                        textoBotao='Visualizar outros posts'
                        url='/posts'
                        isForcarFullscreen={true}
                    />
                )
            }
        </Fragment>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as categorias de posts;
    const url = CONSTANTS_POSTS_CATEGORIAS.API_URL_GET_TODOS;
    const posts = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = posts?.map(p => ({
        params: {
            id: p.postCategoriaId.toString(),
            nome: ajustarUrl(p.categoria)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Posts;
    const url = `${CONSTANTS_POSTS.API_URL_GET_POR_POST_CATEGORIA_ID}/${id}`;
    const posts = await Fetch.getApi(url, null);

    return {
        props: {
            posts
        },
        // revalidate: 10 // segundos
    }
}