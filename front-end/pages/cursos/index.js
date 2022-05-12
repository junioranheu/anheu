import React, { useEffect } from 'react';
import Styles from '../../styles/cursos.module.css';

export default function Index() {
    // console.log(disciplinas);

    useEffect(() => {
        // Título da página;
        document.title = `Cursos — Anheu`;
    }, []);

    return (
        <section className={Styles.flexColumn}>
            <div>
                <span className='titulo'>Cursos disponíveis no <span className='grifar'>Anheu</span></span>
            </div>
        </section>
    )
}

// export async function getStaticProps() {
//     const url = CONSTANTS_DISCIPLINAS.API_URL_GET_TODOS;
//     const res = await fetch(url)
//     const disciplinas = await res.json();

//     return {
//         props: {
//             disciplinas
//         },
//     }
// }