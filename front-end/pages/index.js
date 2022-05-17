import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Index() {

    useEffect(() => {
        // Título da página;
        document.title = `Início — Anheu`;
    }, []);

    return (
        <div className='paddingPadrao margem50 flexColumn' style={{ backgroundColor: 'var(--preto)', height: '100vh' }}>
            <Link href='/disciplinas'>
                <a className='topico'>Disciplinas</a>
            </Link>

            <Link href='/cursos'>
                <a className='topico'>Cursos</a>
            </Link>
        </div>
    )
} 
