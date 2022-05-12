import 'animate.css/animate.min.css';
import React, { useEffect, useState } from 'react';
import '../fonts/GTWalsheim.css';
import '../fonts/NanumPenScript.css';
import '../fonts/PTMono.css';
import LayoutDisciplinas from '../layouts/disciplinas.js';
import LayoutPadrao from '../layouts/padrao.js';
import '../styles/globals.css';

export default function App({ Component, pageProps, ...appProps }) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        function ajustarUrl(url) {
            let urlAjustada = url.split('/').pop().trim();
            urlAjustada = urlAjustada.charAt(0).toUpperCase() + urlAjustada.slice(1);
            return urlAjustada;
        }

        // Setar url no Hook, para usar em verificarLayout();
        setUrl(appProps.router.pathname);
    }, [appProps]);

    function verificarLayout() {
        // console.log(`Url: ${url}`);

        if (url.includes('/disciplinas') || url.includes('/cursos')) {
            return <LayoutDisciplinas Component={Component} pageProps={pageProps} />
        } else {
            return <LayoutPadrao Component={Component} pageProps={pageProps} />
        }
    }

    return url ? verificarLayout() : null;
}
