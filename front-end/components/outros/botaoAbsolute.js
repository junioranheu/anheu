import React, { Fragment, useEffect, useState } from 'react';
import Voltar from '../svg/voltar.js';
import Botao from './botao.js';

export default function BotaoAbsolute({ textoBotao, routerBack, isNovaAba }) {

    const [isMostrarBotao, setIsMostrarBotao] = useState(false);
    useEffect(() => {
        function handleScroll(e) {
            const yAtual = e?.target?.scrollTop;
            // console.log(yAtual);

            if (yAtual >= 100) {
                setIsMostrarBotao(true);
            } else {
                setIsMostrarBotao(false);
            }
        }

        if (typeof window !== 'undefined') {
            document.addEventListener('scroll', (e) => handleScroll(e), { capture: true });
        }
    }, [isMostrarBotao]);

    return (
        <Fragment>
            {
                isMostrarBotao && (
                    <div className='botaoAbsoluteCustom animate__animated animate__fadeIn' onClick={routerBack}>
                        <Botao texto={textoBotao} url={null} isNovaAba={isNovaAba} Svg={<Voltar />} refBtn={null} isEnabled={true} />
                    </div>
                )
            }
        </Fragment>
    )
}