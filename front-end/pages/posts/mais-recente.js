import Router from 'next/router';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import CONSTANTS_POSTS from '../../utils/data/constPosts';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function PostMaisRecenta() {
    document.title = 'Anheu - Post mais recente';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function getPostMaisRecente() {
            NProgress.start();
            const url = CONSTANTS_POSTS.API_URL_GET_ULTIMO_POST;
            const post = await Fetch.getApi(url, null);
            // console.log(post);

            NProgress.done();
            paginaCarregada(true, 200, 500, setIsLoaded);

            Router.push(`/posts/${post.postId}/${ajustarUrl(post.titulo)}`);
        }


        getPostMaisRecente();
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem50'>
            <div className='centralizarTexto'>
                <span className='titulo'>Carregando post mais recente...</span>
            </div>
        </section>
    )
}

