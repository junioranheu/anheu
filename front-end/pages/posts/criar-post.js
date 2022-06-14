import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Botao from '../../components/outros/botao.js';
import Dropdown from '../../components/outros/dropdown.js';
import RichTextEditor from '../../components/outros/richTextEditor';
import Styles from '../../styles/criarPost.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_POSTS from '../../utils/data/constPosts';
import CONSTANTS_POSTS_CATEGORIAS from '../../utils/data/constPostsCategorias';
import ajustarUrl from '../../utils/outros/ajustarUrl';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import numeroAleatorio from '../../utils/outros/numeroAleatorio';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function CriarPost(postsCategorias) {
    document.title = 'Anheu — Criar novo post';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioTipoId = isAuth ? Auth?.getUsuarioLogado()?.usuarioTipoId : '';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    const refCategoria = useRef();
    const refTitulo = useRef();
    const refBtn = useRef();

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const formDataInicial = { categoriaId: 0, titulo: '' };
    const [formData, setFormData] = useState(formDataInicial);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [conteudo, setConteudo] = useState('');
    function atualizarFormDataConteudo(str) {
        // console.log('str: ' + str);
        setConteudo(str);
    }

    // Ao clicar no botão para criar novo post;
    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.categoriaId || !formData.titulo || !conteudo) {
            NProgress.done();
            Aviso.warn('Existem campos vazios. Verifique-os, por favor!', 5000);
            refBtn.current.disabled = false;
            return false;
        }

        const urlCriarPost = CONSTANTS_POSTS.API_URL_POST_CRIAR;
        const post_a_ser_criado = {
            titulo: formData.titulo,
            conteudoPost: conteudo,
            usuarioId: Auth?.getUsuarioLogado()?.usuarioId,
            dataRegistro: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            isAtivo: 1,
            postCategoriaId: formData.categoriaId
        };

        const token = Auth.getUsuarioLogado().token;
        const novoPostId = await Fetch.postApi(urlCriarPost, post_a_ser_criado, token);
        if (!novoPostId) {
            NProgress.done();
            Aviso.warn('Houve algum erro ao criar o novo post', 5000);
            refBtn.current.disabled = false;
            return false;
        }

        Aviso.success('Novo post criado', 5000);
        refBtn.current.disabled = true;
        NProgress.done();

        setTimeout(function () {
            const urlNovoPost = `/posts/${novoPostId}/${ajustarUrl(formData.titulo)}`;
            Router.push({ pathname: urlNovoPost });
        }, numeroAleatorio(500, 1000));
    };

    if (!isLoaded) {
        return false;
    }

    if (usuarioTipoId !== 1) {
        Router.push({ pathname: '/404', query: { msg: 'sem-acesso' } });
        return false;
    }

    return (
        <section className={'flexColumn paddingPadrao margem50'}>
            <span className='titulo'>Novo post</span>
            {/* <span className='tituloDesc'>xxx</span> */}

            <div className='margem10'>
                <div className={Styles.margemTopP}>
                    <Dropdown
                        placeholder='Selecione uma categoria'
                        data={postsCategorias.postsCategorias}
                        referencia={refCategoria}
                        name='categoriaId'
                        onChangeHandler={handleChange}
                    />
                </div>

                <input className={`input ${Styles.margemTopP}`} type='text' placeholder='Título'
                    name='titulo' onChange={handleChange} ref={refTitulo}
                />

                <div className={Styles.margemTopP}>
                    <RichTextEditor atualizarFormDataConteudo={atualizarFormDataConteudo} />
                </div>

                <div className={`${Styles.botaoCustom} ${Styles.margemTopP}`} onClick={handleSubmit}>
                    <Botao texto={'Criar post'} url={''} isNovaAba={false} Svg='' refBtn={refBtn} isEnabled={true} />
                </div>
            </div>

            {/* Espaço a mais */}
            <div className='espacoBottom'></div>
        </section>
    )
}

export async function getStaticProps() {
    // Categorias dos posts;
    const url = CONSTANTS_POSTS_CATEGORIAS.API_URL_GET_TODOS;
    const postsCategorias = await Fetch.getApi(url, null);

    // Normalizar o array, para que o campo 'categoria' seja 'texto' e 'postCategoriaId' seja 'id, por exemplo;
    // Assim sendo possível usar esses valores no componente Dropdown;
    for (let i = 0; i < postsCategorias.length; i++) {
        postsCategorias[i].id = postsCategorias[i]['postCategoriaId'];
        postsCategorias[i].texto = postsCategorias[i]['categoria'];
        delete postsCategorias[i].postCategoriaId;
        delete postsCategorias[i].categoria;
    }

    return {
        props: {
            postsCategorias
        },
        // revalidate: 10 // segundos
    }
}