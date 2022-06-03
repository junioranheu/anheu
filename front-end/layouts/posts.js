import { useRouter } from 'next/router';
import { Resizable } from 're-resizable';
import React, { useEffect, useState } from 'react';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';
import SidebarDireita from '../components/posts/sidebarDireita';
import SidebarEsquerda from '../components/posts/sidebarEsquerda';
import Styles from '../styles/posts.module.css';

export default function Posts({ Component, pageProps }) {
    const router = useRouter();

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

            <section className={Styles.secaoPrincipalPosts}>
                <Resizable
                    defaultSize={{
                        width: 280
                    }}

                    minWidth={250}
                    maxWidth={400}
                >
                    <aside className={Styles.bordaDireita}>
                        <SidebarEsquerda />
                    </aside>
                </Resizable>

                <main className={`${efeitoAnimar}`}>
                    <Component {...pageProps} />
                </main>

                <Resizable
                    defaultSize={{
                        width: 280
                    }}

                    minWidth={250}
                    maxWidth={400}
                >
                    <aside className={Styles.bordaEsquerda}>
                        <SidebarDireita />
                    </aside>
                </Resizable>
            </section>

            <Footer />
        </section>
    )
}
