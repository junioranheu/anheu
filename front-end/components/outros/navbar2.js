import Link from 'next/link';
import React, { useState } from 'react';
import Styles from '../../styles/navbar2.module.css';
import Anheu from '../svg/anheu';
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
                        <Link href='/'><a className={Styles.iconeCorInvertida}><Anheu width='0.9rem' cor='var(--branco)' />&nbsp;&nbsp;Anheu</a></Link>
                        <Link href='/posts'><a>Posts & tutoriais</a></Link>
                        <Link href='/cursos'><a>Cursos</a></Link>
                        {/* <Link href='/precos'><a>Preços</a></Link> */}
                        <a onClick={() => handleLupa()}><Lupa height='1.5rem' width='1.5rem' cor='rgba(255, 255, 255, 0.7)' /></a>
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
                        <Lupa width='1.5rem' cor='rgba(255, 255, 255, 0.7)' />
                        <input className={Styles.input} type='text' placeholder='Busque algo aqui...' />
                        <button className={Styles.botaoXis} onClick={() => handleLupa()}><Xis height='1.5rem' width='1.5rem' cor='rgba(255, 255, 255, 0.7)' /></button>
                    </div>
                </div>
            )}
        </nav>
    )
}