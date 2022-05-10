import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/navbar3.module.css';

export default function Navbar3() {
    const itens = [
        { item: 'Disciplinas', url: '/cursos' },
        { item: 'Ao vivo', url: '' },
        { item: 'Exercícios', url: '/docs/guias' },
        { item: 'Materiais de apoios', url: '/' }
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