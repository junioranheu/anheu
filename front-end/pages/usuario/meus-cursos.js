import React, { useEffect } from 'react';

export default function Index({ }) {
    // console.log(disciplinas);

    useEffect(() => {
        // Título da página;
        document.title = `Meus cursos — Anheu`;
    }, []);

    return (
        <section className='flexColumn'>
            <div>
                <span className='titulo'>Meus cursos</span>
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