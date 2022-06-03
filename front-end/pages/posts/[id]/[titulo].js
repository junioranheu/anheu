import React, { useEffect, useState } from 'react';
import CONSTANTS_POSTS from '../../../utils/data/constPosts';
import ajustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';
import paginaCarregada from '../../../utils/outros/paginaCarregada';

export default function Post({ post }) {
    // console.log(post);

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        document.title = post ? `Anheu — ${post.titulo}` : 'Anheu - Post';
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, [post]);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem50'>
            <div className='centralizarTexto'>
                <span className='titulo'>{post.titulo}</span>
            </div>

            <div className='margem30'>
                <div className='texto' dangerouslySetInnerHTML={{ __html: post.conteudoPost }}></div>
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas os posts;
    const url = CONSTANTS_POSTS.API_URL_GET_TODOS;
    const posts = await Fetch.getApi(url, null);

    // Gerar o "paths";
    const paths = posts?.map(p => ({
        params: {
            id: p.postId.toString(),
            titulo: ajustarUrl(p.titulo)
        }
    }));

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id;

    // Post;
    const url = `${CONSTANTS_POSTS.API_URL_GET_POR_ID}/${id}`;
    const post = await Fetch.getApi(url, null);

    return {
        props: {
            post
        },
        // revalidate: 10 // segundos
    }
}