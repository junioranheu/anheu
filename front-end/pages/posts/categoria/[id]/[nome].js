import React from 'react';
import CONSTANTS_POSTS from '../../../../utils/data/constPosts';
import CONSTANTS_POSTS_CATEGORIAS from '../../../../utils/data/constPostsCategorias';
import AjustarUrl from '../../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../../utils/outros/fetch';

export default function Post({ posts }) {
    // console.log(posts);

    return (
        <section>
            <h1>Teste</h1>
        </section>
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
            nome: AjustarUrl(p.categoria)
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