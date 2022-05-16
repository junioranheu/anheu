import 'animate.css/animate.min.css';
import 'nprogress/nprogress.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../fonts/GTWalsheim.css';
import '../fonts/NanumPenScript.css';
import '../fonts/PTMono.css';
import LayoutCursos from '../layouts/cursos';
import LayoutDisciplinas from '../layouts/disciplinas.js';
import LayoutPadrao from '../layouts/padrao.js';
import '../styles/globals.css';
import { CursoProvider } from '../utils/context/cursoContext';
import { UsuarioProvider } from '../utils/context/usuarioContext';

export default function App({ Component, pageProps, ...appProps }) {
    const [url, setUrl] = useState('');

    useEffect(() => {
        // Setar url no Hook, para usar em verificarLayout();
        setUrl(appProps.router.pathname);
    }, [appProps]);

    function verificarLayout() {
        // console.log(`Url: ${url}`);

        if (url.includes('/disciplinas')) {
            return <LayoutDisciplinas Component={Component} pageProps={pageProps} />
        } else if (url.includes('/cursos') || url.includes('/meus-cursos')) {
            return <LayoutCursos Component={Component} pageProps={pageProps} />
        } else {
            return <LayoutPadrao Component={Component} pageProps={pageProps} />
        }
    }

    return url ?
        (
            <UsuarioProvider>
                <CursoProvider>
                    <ToastContainer className='semHighlight' />

                    {verificarLayout()}
                </CursoProvider>
            </UsuarioProvider>
        ) :
        null;
}
