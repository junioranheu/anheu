import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import Botao from '../../components/outros/botao.js';
import Dropdown from '../../components/outros/dropdown.js';
import Styles from '../../styles/criarPost.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_POSTS_CATEGORIAS from '../../utils/data/constPostsCategorias';
import { Fetch } from '../../utils/outros/fetch';
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
    const refConteudo = useRef();
    const refBtn = useRef();

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState(null);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para criar novo post;
    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            NProgress.done();
            Aviso.warn('O nome de usuário e/ou e-mail estão vazios!', 5000);
            refSenha.current.value = '';
            refUsuario.current.select();
            refBtn.current.disabled = false;
            return false;
        }
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
            <span className='titulo'>Criar novo post</span>
            {/* <span className='tituloDesc'>xxx</span> */}

            <div className='margem10'>
                <div className={Styles.margemTopP}>
                    <Dropdown
                        placeholder='Selecione uma categoria'
                        data={postsCategorias.postsCategorias}
                        ref={refCategoria}
                        name='categoriaId'
                        onChangeHandler={handleChange}
                    />
                </div>

                <input className={`input ${Styles.margemTopP}`} type='text' placeholder='Título'
                    name='titulo' onChange={handleChange} ref={refTitulo}
                />

                <input className={`input ${Styles.margemTopP}`} type='text' placeholder='Conteúdo'
                    name='conteudo' onChange={handleChange} ref={refConteudo}
                />

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

    // Normalizar o array, para que o campo "categoria" seja "texto" e "postCategoriaId" seja "id, por exemplo;
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