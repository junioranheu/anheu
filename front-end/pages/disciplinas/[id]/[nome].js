import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import ItemRow from '../../../components/outros/itemRow';
import ImgCinza from '../../../static/image/cinza.webp';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTANTS_DISCIPLINAS from '../../../utils/data/constDisciplinas';
import CONSTANTS_UPLOAD from '../../../utils/data/constUpload';
import AjustarUrl from '../../../utils/outros/ajustarUrl';
import { Fetch } from '../../../utils/outros/fetch';

export default function Disciplina({ disciplina }) {
    // console.log(disciplina);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioGenero = isAuth ? Auth?.getUsuarioLogado()?.genero : 'o';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        // Título da página;
        document.title = `Anheu — ${disciplina.nome}`;

        setTimeout(function () {
            setIsLoaded(true);
            console.log('a');
        }, 200);
    }, [disciplina]);

    if (!isAuth) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    if (!isLoaded) {
        return false;
    }

    return (
        <section className='flexColumn paddingPadrao margem50'>
            <div className='flexColumn'>
                <span className='titulo'>Bem-vind{usuarioGenero} às aulas de <span className='grifar'>{disciplina.nome}</span></span>
            </div>

            <div className='margem30'>
                {
                    disciplina?.aulas?.filter(x => x.isAtivo === 1).map((a, i) => (
                        <ItemRow
                            key={i}
                            data={a}
                            id={a.aulaId}
                            titulo={a.nome}
                            descricao={a.resumoAula}
                            itemzinho={null}
                            itemzao={null}
                            isMostrarItemzao={false}
                            handleClick={() => Router.push(`/aula/${a.aulaId}/${AjustarUrl(a.nome)}`)}
                            idReferenciaParaAlterarCor={null}
                            tags={null}
                            imagem={(a.thumbnail ? `${CONSTANTS_UPLOAD.API_URL_GET_AULAS_THUMBNAIL}/${a.thumbnail}` : ImgCinza)}
                        />
                    ))
                }
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticPaths() {
    // Tutorial de getStaticPaths: https://www.youtube.com/watch?v=V2T_bkOs0xA&ab_channel=FilipeDeschamps

    // Todas as disciplinas;
    const url = CONSTANTS_DISCIPLINAS.API_URL_GET_TODOS;
    const disciplinas = await Fetch.getApi(url, null);

    // console.log(disciplinas);

    // Gerar o "paths";
    const paths = disciplinas?.map(d => ({
        params: {
            id: d.disciplinaId.toString(),
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

    // Disciplina;
    const url = `${CONSTANTS_DISCIPLINAS.API_URL_GET_POR_ID}/${id}`;
    const disciplina = await Fetch.getApi(url, null);

    return {
        props: {
            disciplina
        },
        // revalidate: 10 // segundos
    }
}
