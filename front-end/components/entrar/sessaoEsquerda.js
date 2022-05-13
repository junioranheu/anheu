import Link from 'next/link';
import React, { useState } from 'react';
import Botao from '../../components/outros/botao.js';
import Styles from '../../styles/entrar.module.css';
import Anheu from '../svg/anheu.js';
import Google from '../svg/google.js';

export default function SessaoEsquerda() {
    const [opcaoContinuarEmail, setOpcaoContinuarEmail] = useState(false);

    return (
        <section className={Styles.divEsquerda}>
            <Anheu width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Bem-vindo ao Anheu</span>
            <span className={Styles.subtitulo}>Não tem uma conta ainda? <Link href='/criar-conta'><a className={'cor-principal'}>Crie a sua aqui</a></Link></span>

            <div className={`${Styles.botaoCustom} ${Styles.margemTopXP}`}>
                <Botao texto='&nbsp;&nbsp;Continuar com o Google' url={'/docs'} isNovaAba={false} Svg={<Google width='25px' cor='white' />} />
            </div>

            {opcaoContinuarEmail ? (
                <div>
                    <div className={Styles.divisao}>ou</div>

                    <input className={`${Styles.input} ${Styles.margemTopP}`} type='email' placeholder='E-mail' autoCorrect='off' autoCapitalize='off' spellCheck='false' />

                    <div className={`${Styles.botaoCustom} ${Styles.margemTopP}`}>
                        <Botao texto={'Entrar'} url={'/docs'} isNovaAba={false} Svg='' />
                    </div>
                </div>
            ) : (
                <div className={Styles.margemTopXP}>
                    <a className='cor-principal pointer' onClick={() => setOpcaoContinuarEmail(true)}>Entrar com e-mail</a>
                </div>
            )}

        </section>
    )
}
