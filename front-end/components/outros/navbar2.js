import Link from 'next/link';
import React, { useState } from 'react';
import Styles from '../../styles/navbar2.module.css';
import Framer from '../svg/framer';
import Lupa from '../svg/lupa';
import Xis from '../svg/xis';
import Botao from './botao';

export default function Navbar2() {
    const [isLupa, setIsLupa] = useState(false);

    function handleLupa() {
        setIsLupa(!isLupa);
    }

    return (
        <nav className={Styles.navbar}>
            {!isLupa ? (
                <div className={Styles.wrapper}>
                    <div className={Styles.divEsquerda}>
                        <Link href='/'><a className={Styles.iconeCorInvertida}><Framer width='0.9rem' />&nbsp;&nbsp;Framer</a></Link>
                        <Link href='/docs'><a>Documentação</a></Link>
                        <Link href='/devs'><a>Desenvolvedores</a></Link>
                        {/* <Link href='/precos'><a>Preços</a></Link> */}
                        <a onClick={() => handleLupa()}><Lupa /></a>
                    </div>

                    <div className={Styles.divDireita}>
                        <Link href='/entrar'><a>Entrar</a></Link>

                        <span className={Styles.margemBotao}>
                            <Botao texto={'Crie sua conta'} url={'/criar-conta'} isNovaAba={false} Svg='' />
                        </span>
                    </div>
                </div>
            ) : (
                <div className={Styles.divLupa}>
                    <div>
                        <Lupa />
                        <input className={Styles.input} type='text' placeholder='Busque algo aqui...' />
                        <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis width='1.5rem' /></button>
                    </div>
                </div>
            )}
        </nav>
    )
}