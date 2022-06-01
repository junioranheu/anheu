import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/posts.module.css';
import CONSTANTS_POSTS_CATEGORIAS from '../../utils/data/constPostsCategorias';
import AjustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';

export default function SidebarEsquerda() {
    const { asPath } = useRouter();

    const [urlAtual, setUrlAtual] = useState('');
    const [postsCategorias, setPostsCategorias] = useState({});
    useEffect(() => {
        async function getCursosCategorias() {
            const url = CONSTANTS_POSTS_CATEGORIAS.API_URL_GET_TODOS;
            const categorias = await Fetch.getApi(url, null);
            setPostsCategorias(categorias);
        }

        setUrlAtual(asPath);
        getCursosCategorias();
    }, [asPath]);

    if (!postsCategorias.length) {
        return null;
    }

    return (
        <section className={`${Styles.sessaoNavbar} animate__animated animate__fadeIn delay03`}>
            <Link href={`/posts`}>
                <a className={`cor-principal-hover ${(urlAtual === '/posts' ? 'opacidade' : '')}`}>Início</a>
            </Link>

            {
                postsCategorias?.map((p, i) => (
                    <Link key={i} href={`/posts/categoria/${p.postCategoriaId}/${AjustarUrl(p.categoria)}`}>
                        <a className={`cor-principal-hover ${(urlAtual === p.categoria ? 'opacidade' : '')}`}>{p.categoria}</a>
                    </Link>
                ))
            }
        </section>
    )
}
