import React from 'react';
import Botao from '../components/outros/botao';
import Styles from '../styles/404.module.css';

export default function Erro() {
    return (
        <section className={Styles.wrapper}>
            <span className='titulo'>Opa...</span>
            <span className='tituloDesc margem10'>Parece que algo deu errado.<br />Você tem certeza que tinha acesso à ação requisitada?</span>

            <div className='margem50'>
                <Botao texto='Voltar ao início' url={'/'} isNovaAba={false} Svg={null} refBtn={null} />
            </div>
        </section>
    )
}
