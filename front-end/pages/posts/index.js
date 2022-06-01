import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import ItemRow from '../../components/outros/itemRow';
import ImgCinza from '../../static/image/cinza.webp';
import CONSTANTS_POSTS_CATEGORIAS from '../../utils/data/constPostsCategorias';
import CONSTANTS_UPLOAD from '../../utils/data/constUpload';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Index({ postsCategorias }) {
    document.title = 'Anheu — Posts & tutoriais';
    
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }

    return (
        <section className={'flexColumn paddingPadrao margem50'}>
            <span className='titulo'>Posts & tutoriais</span>
            <span className='tituloDesc'>Fique à vontade para navegar entre as categorias abaixo e aprender com os posts e tutoriais</span>

            <div className='margem30'>
                {
                    postsCategorias?.map((p, i) => (
                        <ItemRow
                            key={i}
                            data={p}
                            id={p.postCategoriaId}
                            titulo={p.categoria}
                            descricao={null}
                            itemzinho={null}
                            itemzao={null}
                            isMostrarItemzao={false}
                            handleClick={() => Router.push(`/posts/categoria/${p.postCategoriaId}/${ajustarUrl(p.categoria)}`)}
                            idReferenciaParaAlterarCor={null}
                            tags={null}
                            imagem={(p.imagem ? `${CONSTANTS_UPLOAD.API_URL_GET_POSTS_CATEGORIAS}/${p.imagem}` : ImgCinza)}
                        />
                    ))
                }
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    const url = CONSTANTS_POSTS_CATEGORIAS.API_URL_GET_TODOS;
    const postsCategorias = await Fetch.getApi(url, null);

    return {
        props: {
            postsCategorias
        },
        // revalidate: 10 // segundos
    }
}