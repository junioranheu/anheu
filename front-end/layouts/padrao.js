import React, { Fragment } from 'react';

export default function Padrao({ Component, pageProps }) {
    return (
        <Fragment>
            <main className='main semHighlight'>
                <section>
                    <Component {...pageProps} />
                </section>
            </main>
        </Fragment >
    )
}
