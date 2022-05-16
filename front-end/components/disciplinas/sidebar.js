import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Styles from '../../styles/disciplinas.module.css';

export default function Sidebar() {
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
 
    return (
        <section className={Styles.sessaoNavbar}>
            {/* <b style={{ color: 'white' }}>Oi né<span className='efeito-new'>teste</span></b> */}
            {itens.map((item, i) => (
                <Link key={i} href={item.url}>
                    <a className={`opacidade-hover ${(urlAtual === item.url ? 'opacidade' : '')}`}>{item.item}</a>
                </Link>
            ))}
        </section>
    )
}
 