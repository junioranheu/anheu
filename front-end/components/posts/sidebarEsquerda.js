import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Styles from '../../styles/posts.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';

export default function SidebarEsquerda() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioTipoId = isAuth ? Auth?.getUsuarioLogado()?.usuarioTipoId : '';

    const itens = [
        { item: 'Início', url: '/posts' },
        { item: 'Post mais recente', url: '/posts/mais-recente' },
        { item: 'Post mais visto do dia', url: '/posts/xxx' },
        { item: 'Sobre', url: '/posts/xxx' },
        { item: 'Contribua', url: '/posts/xxx' }
    ]

    const { asPath } = useRouter();
    const [urlAtual, setUrlAtual] = useState('');
    useEffect(() => {
        // console.log(asPath);
        setUrlAtual(asPath);
    }, [asPath]);

    return (

        <section className={`${Styles.sessaoNavbar} animate__animated animate__fadeIn delay03`}>
            {
                usuarioTipoId === 1 && (
                    <Link key={1} href='/posts/criar-post'>
                        <a className={`cor-principal-hover ${(urlAtual === '/posts/criar-post' ? 'opacidade' : '')}`}>Criar novo post <span className='efeito-new'>adm</span></a>
                    </Link>
                )
            }

            {
                itens?.map((item, i) => (
                    <Link key={i} href={item.url}>
                        <a className={`cor-principal-hover ${(urlAtual === item.url ? 'opacidade' : '')}`}>{item.item}</a>
                    </Link>
                ))
            }
        </section>
    )
}
