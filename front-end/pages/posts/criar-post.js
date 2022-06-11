import Router from 'next/router';
import NProgress from 'nprogress';
import { useContext, useEffect, useRef, useState } from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/criarPost.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function CriarPost() {
    document.title = 'Anheu — Criar novo post';
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioTipoId = isAuth ? Auth?.getUsuarioLogado()?.usuarioTipoId : '';

    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    const refUsuario = useRef();
    const refSenha = useRef();
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
            <span className='tituloDesc'>xxx</span>

            <div className='margem10'>
                <input className={`input ${Styles.margemTopP}`} type='text' placeholder='xxx'
                    name='xxx' onChange={handleChange} ref={refUsuario}
                />

                <input className={`input ${Styles.margemTopP}`} type='password' placeholder='yyy'
                    name='yyy' onChange={handleChange} ref={refSenha}
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

