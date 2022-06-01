import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/posts.module.css';

export default function SidebarEsquerda() {
    const itens = [
        { item: 'Disciplinas', url: '/disciplinas' },
        { item: 'Meus cursos', url: '/usuario/meus-cursos' }
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
                itens?.map((item, i) => (
                    <Link key={i} href={item.url}>
                        <a className={`cor-principal-hover ${(urlAtual === item.url ? 'opacidade' : '')}`}>{item.item}</a>
                    </Link>
                ))
            }
        </section>
    )
}
