import React, { Fragment } from 'react';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';
import Styles from '../styles/disciplinas.module.css';

export default function Cursos({ Component, pageProps }) {
    return (
        <Fragment> 
            <main className='main semHighlight'>
                <Navbar1 />
                <Navbar2 />

                <section className={Styles.secaoPrincipal}>
                    <main>
                        <Component {...pageProps} />
                    </main>
                </section>

                <Footer />
            </main>
        </Fragment>
    )
}
