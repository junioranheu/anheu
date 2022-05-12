import Link from 'next/link';
import React, { useEffect } from 'react';

export default function Index() {

    useEffect(() => {
        // Título da página;
        document.title = `Início — Anheu`;
    }, []);

    return (
        <div style={{ backgroundColor: 'var(--preto)', height: '100vh' }}>
            <span className='topico'>Index</span><br />

            <Link href='/disciplinas'>
                <a className='topico'>Disciplinas</a>
            </Link>
        </div>
    )
} 
