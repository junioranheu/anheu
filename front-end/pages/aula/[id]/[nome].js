import Router from 'next/router';
import React, { useContext, useEffect } from 'react';
import { UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_AULAS from '../../../utils/data/constAulas';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';

export default function Aula({ aula }) {
    console.log(aula);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    useEffect(() => {
        // Título da página;
        document.title = `Anheu — ${aula.nome}`;
    }, [aula]);

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem50'>
            <span className='topico'>{aula.nome}</span>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as aulas;
    const url = CONSTANTS_AULAS.API_URL_GET_TODOS;
    const aulas = await Fetch.getApi(url, null);

    // Gerar o "paths";
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
    const aula = await Fetch.getApi(url, null);

    return {
        props: {
            aula
        },
        // revalidate: 10 // segundos
    }
}
