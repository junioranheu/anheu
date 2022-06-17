import Router from 'next/router';
import { useEffect, useState } from 'react';
import ItemRow from '../../components/outros/itemRow';
import Styles from '../../styles/landingPage.module.css';
import CONSTANTS_POSTS from '../../utils/data/constPosts';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import diferencaEmSegundos from '../../utils/outros/diferencaEmSegundos';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import segundosParaDHMS from '../../utils/outros/segundosParaDHMS';

export default function Sessao3() {

    const [ultimoPost, setUltimoPost] = useState();
    const [postAnterior, setPostAnterior] = useState(0);
    const [animarDiv, setAnimarDiv] = useState('');
    useEffect(() => {
        async function getUltimoPost() {
            const url = CONSTANTS_POSTS.API_URL_GET_ULTIMO_POST;
            const post = await Fetch.getApi(url, null);
            setUltimoPost(post);

            // Detectar novo post;
            // console.log(postAnterior, post.postId);
            if (String(postAnterior) !== String(post.postId)) {
                // console.log('Novo post detectado');
                setAnimarDiv('animate__animated animate__shakeY');

                setTimeout(function () {
                    setAnimarDiv('');
                }, 2000);
            }

            setPostAnterior(post.postId);
        }

        // Primeira verificação do último post;
        getUltimoPost();

        // Rodar a função a cada X segundos - https://stackoverflow.com/questions/40510560/setinterval-with-setstate-in-react
        const intervaloPollMs = 3500;
        const poll = setInterval(() => {
            getUltimoPost();
        }, intervaloPollMs);

        return () => clearInterval(poll);
    }, [postAnterior]);

    return (
        <section className={Styles.principalFitContent}>
            <span className={`${Styles.efeitoTextoCorPrincipal} ${Styles.margemTitulo}`}>Recurso em tempo real</span>

            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTopP}`}>
                <span className={Styles.tituloPrincipalMedio}>Veja aqui, em tempo real,</span>
                <span className={Styles.tituloPrincipalMedio}>o último post ou tutorial</span>
                <span className={Styles.tituloPrincipalMedio}>publicado no&nbsp;<span className='cor-principal'>Anheu</span></span>
            </div>

            {
                ultimoPost && (
                    <div className={`${Styles.margemTopP} ${Styles.personalizarItemRow} ${animarDiv}`}>
                        <ItemRow
                            key={1}
                            data={ultimoPost}
                            id={ultimoPost.postId}
                            titulo={ultimoPost.titulo}
                            descricao={`Postado por @${ultimoPost?.usuarios?.nomeUsuarioSistema}, ${segundosParaDHMS(diferencaEmSegundos(horarioBrasilia(), ultimoPost.dataRegistro))}`}
                            itemzinho={`Post sobre ${ultimoPost.postsCategorias?.categoria}`}
                            itemzao={null}
                            isMostrarItemzao={false}
                            handleClick={() => Router.push(`/posts/${ultimoPost.postId}/${ajustarUrl(ultimoPost.titulo)}`)}
                            idReferenciaParaAlterarCor={null}
                            tags={null}
                            imagem={null}
                        />
                    </div>
                )
            }
        </section>
    )
}