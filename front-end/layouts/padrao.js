import Moment from 'moment';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { Aviso } from '../components/outros/aviso';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';
import { Auth, UsuarioContext } from '../utils/context/usuarioContext';
import HorarioBrasilia from '../utils/outros/horarioBrasilia';

export default function Padrao({ Component, pageProps }) {
    const router = useRouter();
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;

    // Verificar se o token ainda é válido;
    useEffect(() => {
        if (isAuth) {
            const horaAgora = HorarioBrasilia();
            const dataAutenticacao = Auth.getUsuarioLogado()?.dataAutenticacao;
            var duracao = Moment.duration(horaAgora.diff(dataAutenticacao));
            var diferencaHoras = duracao.asHours();
            // console.log(diferencaHoras);

            // Foi definido na API, no método ServicoGerarToken() em Services/TokenService.cs, que o token JWT expira em 1 mês;
            // Simular um comportamento parecido aqui... caso a diferença seja de xxx horas, limpe o token e mostre uma mensagem ao usuário;
            const limiteExpirarTokenHoras = 24;
            if (diferencaHoras >= limiteExpirarTokenHoras) {
                NProgress.start();
                Aviso.custom('A sua sessão expirou!<br/><br/>Renove sua sessão fazendo login novamente no Anheu 😎', 15000);

                // Desatribuir autenticação ao contexto de usuário;
                setIsAuth(false);

                // Deslogar;
                Auth.deleteUsuarioLogado();
                Router.push({ pathname: '/usuario/entrar' });
                NProgress.done();
            }
        }
    }, [isAuth]);

    // Renovar animação a cada mudança de URL (router.asPath);
    const [efeitoAnimar, setEfeitoAnimar] = useState('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn delay03');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [router.asPath]);

    return (
        <section className='main semHighlight'>
            <Navbar1 />
            <Navbar2 />

            <section className='secaoPrincipal'>
                <main className={`${efeitoAnimar}`}>
                    <Component {...pageProps} />
                </main>
            </section>

            <Footer />
        </section>
    )
}
