import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/navbar3.module.css';

export default function Navbar3() {
    const itens = [
        { item: 'Meus cursos', url: '/usuario/meus-cursos' },
        { item: 'Disciplinas', url: '/disciplinas' },
        { item: 'Ao vivo', url: '/ao-vivo' },
        { item: 'Exercícios', url: '/docs/exercicios' },
        { item: 'Materiais de apoios', url: '/apoios' }
    ]

    const { asPath } = useRouter();
    const [urlAtual, setUrlAtual] = useState('');
    useEffect(() => {
        // console.log(asPath);
        setUrlAtual(asPath);
    }, [asPath]);

    // console.log(itens);

    return (
        <nav className={Styles.navbar}>
            {itens.map((item, i) => (
                <Link key={i} href={item.url}>
                    <a className={`opacidade-hover ${(urlAtual === item.url ? 'opacidade' : '')}`}>{item.item}</a>
                </Link>
            ))}
        </nav>
    )
}