import React, { useContext, useEffect, useState } from 'react';
import CursoRow from '../../components/cursos/cursoRow';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';

export default function MeusCursos() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;

    const [meusCursos, setMeusCursos] = useState({});
    useEffect(() => {
        async function getUsuarioCursos() {
            const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_GET_POR_USUARIO_ID}/${usuarioId}`;
            const cursos = await Fetch.getApi(url, null);
            setMeusCursos(cursos);
        }

        // Título da página;
        document.title = 'Anheu — Meus cursos';

        // Meus cursos;
        if (usuarioId) {
            getUsuarioCursos();
        }
    }, [usuarioId]);

    return (
        <section className='flexColumn paddingPadrao margem50'>
            <div className='centralizarTexto'>
                <span className='titulo'>Meus cursos</span>
            </div>

            <div className='margem30'>
                {
                    meusCursos?.length > 0 && (
                        meusCursos?.filter(x => x.isAtivo === 1).map((c, i) => (
                            <CursoRow
                                key={i}
                                curso={c.cursos}
                                handleClick={null}
                            />
                        ))
                    )
                }
            </div>

            <div className='espacoBottom'></div>
        </section>
    )
}

