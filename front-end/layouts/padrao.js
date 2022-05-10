import React, { Fragment } from 'react';

export default function Padrao({ Component, pageProps }) {
    return (
        <Fragment>
            <main className='main'>
                <section>
                    <Component {...pageProps} />
                </section>
            </main>
        </Fragment >
    )
}
