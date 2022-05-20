import { useRouter } from 'next/router';
import { Resizable } from 're-resizable';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/disciplinas/sidebar';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';

export default function Disciplinas({ Component, pageProps }) {
    const router = useRouter();

    // Renovar animação a cada mudança de URL (router.asPath);
    const [efeitoAnimar, setEfeitoAnimar] = useState('');
    useEffect(() => {
        setEfeitoAnimar('animate__animated animate__fadeIn delay02');

        setTimeout(function () {
            setEfeitoAnimar('');
        }, 1000);
    }, [router.asPath]);

    return (
        <section className='main semHighlight'>
            <Navbar1 />
            <Navbar2 />

            <section className='secaoPrincipal'>
                <Resizable
                    defaultSize={{
                        width: 280
                    }}

                    minWidth={250}
                    maxWidth={400}
                >
                    <aside>
                        <Sidebar />
                    </aside>
                </Resizable>

                <main className={`${efeitoAnimar}`}>
                    <Component {...pageProps} />
                </main>
            </section>

            <Footer />
        </section>
    )
}
