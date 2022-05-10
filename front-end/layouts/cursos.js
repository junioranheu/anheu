import React, { Fragment } from 'react';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';

export default function Cursos({ Component, pageProps }) {
    return (
        <Fragment>
            <main className='main'>
                <Navbar1 />
                <Navbar2 />

                <section className='fundo'>
                    <Component {...pageProps} />
                </section>

                <Footer />
            </main>
        </Fragment >
    )
}
