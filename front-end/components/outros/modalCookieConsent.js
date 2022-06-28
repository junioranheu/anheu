import CookieConsent from 'react-cookie-consent';

// https://www.npmjs.com/package/react-cookie-consent
export default function ModalCookieConsent() {
    return (
        <CookieConsent
            location='bottom'
            buttonText='Sim, estou de acordo'
            cookieName='anheu_cookie_consent'
            style={{ background: 'var(--super-preto)', padding: '1rem' }}
            buttonStyle={{ background: 'var(--cor-principal)', borderRadius: '6px', fontWeight: 600 }}
            buttonClasses='botao'
            expires={7} // Dias;
        >
            <div style={{ marginBottom: '12px' }}>
                <span>A sua privacidade é importante para nós. É política do <b className='cor-principal'>Anheu</b> respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar na plataforma.</span>
                <br />
                <span>Clicando no botão <i>"Sim, estou de acordo"</i>, você declara que está de acordo com a utilização dos cookies na plataforma.</span>
            </div>
        </CookieConsent>
    )
}

