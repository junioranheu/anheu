import React, { useEffect, useState } from 'react';
import paginaCarregada from '../../utils/outros/paginaCarregada';

export default function Index() {
    document.title = 'Anheu — Posts & tutoriais';
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        paginaCarregada(true, 200, 500, setIsLoaded);
    }, []);

    if (!isLoaded) {
        return false;
    }
 
    return (
        <section className={'flexColumn paddingPadrao margem50'}>
            <span className='titulo'>Posts</span>
        </section>
    )
}
