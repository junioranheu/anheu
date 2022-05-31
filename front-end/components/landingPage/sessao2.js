import React from 'react';
import StylesDivIcones from '../../styles/index.divIcones.module.css';
import Styles from '../../styles/index.module.css';
import IconeTeste from '../svg/facebook';
import DivIcone from './divIcone';

export default function Sessao2() {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipalMedio}>O poder do browser</span>
                <span className={Styles.tituloPrincipalMedio}>com a liberdade do canvas</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>Juntando o canvas com código, você se expressa facilmente.</span>
                <span className={Styles.descricaoTituloPrincipal}>Se é possível no browser, é possível no Framer.</span>
            </div>

            <div className={StylesDivIcones.divIcones}>
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='Editor embutido' desc='Um editor de código útil, dentro do browser.' url='/xxx' />
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='Compartilhe' desc='Crie qualquer código e então compartilhe gerando um link.' url='/xxx' />
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='Suporte à NPM' desc='Use o NPM para baixar os pacotes.' url='/xxx' />
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='Menu de importação' desc='Menu para importar seus componentes.' url='/xxx' />
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='DOM' desc='Acesse ao DOM para criar seus componentes' url='/xxx' />
                <DivIcone Svg={<IconeTeste width={'25px'} />} titulo='Framer Motion' desc='Crie animações usando o Framer Motion' url='/xxx' />
            </div>
        </section>
    )
}

