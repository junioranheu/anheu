import { Resizable } from 're-resizable';
import React, { Fragment } from 'react';
import Sidebar from '../components/disciplinas/sidebar';
import Footer from '../components/outros/footer';
import Navbar1 from '../components/outros/navbar1';
import Navbar2 from '../components/outros/navbar2';

export default function Disciplinas({ Component, pageProps }) {
    return (
        <Fragment>
            <main className='main semHighlight'>
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

                    <main>
                        <Component {...pageProps} />
                    </main>
                </section>

                <Footer />
            </main>
        </Fragment>
    )
}
