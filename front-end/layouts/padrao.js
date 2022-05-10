import React, { Fragment } from 'react';

export default function Padrao({ Component, pageProps }) {
    return (
        <Fragment>
            <main className='main'>
                <section className='fundo'>
                    <Component {...pageProps} />
                </section>
            </main>
        </Fragment >
    )
}
