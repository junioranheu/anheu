import React from 'react';
import Styles from '../../styles/landingPage.module.css';

export default function Sessao3() {
    return (
        <section className={Styles.principal}>
            <span className={`${Styles.efeitoTextoCorPrincipal} ${Styles.margemTitulo}`}>Recurso em tempo real</span>

            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTopP}`}>
                <span className={Styles.tituloPrincipalMedio}>Veja aqui, em tempo real,</span>
                <span className={Styles.tituloPrincipalMedio}>os últimos posts & tutoriais</span>
                <span className={Styles.tituloPrincipalMedio}>publicados no&nbsp;<span className='cor-principal'>Anheu</span></span>
            </div>

            {/* <div className={Styles.margemTopP}>
              <span className={Styles.descricaoTituloPrincipal}>xxx</span>
              <span className={Styles.descricaoTituloPrincipal}>xxx</span>
              <span className={Styles.descricaoTituloPrincipal}>xxx</span>
            </div> */}
        </section>
    )
}