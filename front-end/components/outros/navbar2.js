import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import React, { Fragment, useContext, useState } from 'react';
import Styles from '../../styles/navbar2.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import Anheu from '../svg/anheu';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';
import Botao from './botao';

export default function Navbar2() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [isLupa, setIsLupa] = useState(false);

    function handleLupa() {
        setIsLupa(!isLupa);
    }

    function deslogar() {
        NProgress.start();

        // Deslogar;
        Auth.deleteUsuarioLogado();
        NProgress.done();

        // Voltar à tela principal;
        Router.push('/');

        // Desatribuir autenticação ao contexto de usuário;
        setTimeout(function () {
            setIsAuth(false);
        }, 100);
    }

    return (
        <nav className={Styles.navbar}>
            {!isLupa ? (
                <div className={Styles.wrapper}>
                    <div className={Styles.divEsquerda}>
                        <Link href='/'><a className={Styles.iconeCorInvertida}><Anheu width='0.9rem' cor='var(--branco)' />&nbsp;&nbsp;Anheu</a></Link>
                        <Link href='/posts'><a>Posts & tutoriais</a></Link>
                        <Link href='/cursos'><a>Cursos</a></Link>

                        {
                            isAuth && (
                                <Link href='/disciplinas'><a>Minhas aulas</a></Link>
                            )
                        }

                        <a onClick={() => handleLupa()}><Lupa height='1.5rem' width='1.5rem' cor='rgba(255, 255, 255, 0.7)' /></a>
                    </div>

                    <div className={Styles.divDireita}>
                        {isAuth ? (
                            <Fragment>
                                <span className={Styles.margemBotao} onClick={() => deslogar()}>
                                    <Botao texto={'Sair'} url={''} isNovaAba={false} Svg='' refBtn={null} />
                                </span>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Link href='/usuario/criar-conta'><a>Crie sua conta</a></Link>

                                <span className={Styles.margemBotao}>
                                    <Botao texto={'Entrar'} url={'/usuario/entrar'} isNovaAba={false} Svg='' refBtn={null} />
                                </span>
                            </Fragment>
                        )}
                    </div>
                </div>
            ) : (
                <div className={Styles.divLupa}>
                    <div>
                        <Lupa width='1.5rem' cor='rgba(255, 255, 255, 0.7)' />
                        <input className={Styles.input} type='text' placeholder='Busque algo aqui...' />
                        <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1rem' width='1rem' cor='rgba(255, 255, 255, 0.7)' /></button>
                    </div>
                </div>
            )}
        </nav>
    )
}