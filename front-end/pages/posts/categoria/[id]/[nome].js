import React, { Fragment, useEffect, useState } from 'react';
import Banner from '../../../../components/outros/banner';
import CONSTANTS_POSTS from '../../../../utils/data/constPosts';
import CONSTANTS_POSTS_CATEGORIAS from '../../../../utils/data/constPostsCategorias';
import ajustarUrl from '../../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../../utils/outros/fetch';
import paginaCarregada from '../../../../utils/outros/paginaCarregada';

export default function Post({ posts }) {
    console.log(posts);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = (posts.length ? `Anheu — Posts sobre ${posts[0].postsCategorias?.categoria.toLowerCase()}` : 'Anheu — Posts & tutoriais');
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

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

    // Todas os posts;
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

    // Disciplina;
    const url = `${CONSTANTS_POSTS.API_URL_GET_POR_POST_CATEGORIA_ID}/${id}`;
    const posts = await Fetch.getApi(url, null);

    return {
        props: {
            posts
        },
        // revalidate: 10 // segundos
    }
}