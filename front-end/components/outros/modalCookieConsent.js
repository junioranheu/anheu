import { latin } from '@bbc/gel-foundations/scripts';
import { ConsentBanner, ConsentBannerText } from '@bbc/psammead-consent-banner';
import { useState } from 'react';
import Botao from './botao';

// https://www.npmjs.com/package/@bbc/psammead-consent-banner
export default function ModalCookieConsent() {
    const [isMostrar, setIsMostrar] = useState(true);

    const Accept = (
        <div onClick={() => setIsMostrar(!isMostrar)}>
            <Botao texto='Ok, estou de acordo' url={null} isNovaAba={false} Svg={null} refBtn={null} isEnabled={true} />
        </div>
    );

    const Reject = (
        <a href='https://www.bbc.co.uk/usingthebbc/your-data-matters' target='_blank'>
            Saiba mais
        </a>
    );

    const Text = (
        <ConsentBannerText dir='ltr' script={latin} service='news'>
            A sua privacidade é importante para nós. É política do Anheu respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar na plataforma.
            <br /><br />Clicando no botão abaixo, você declara que está de acordo com a utilização dos cookies na plataforma.
        </ConsentBannerText>
    );

    const props = {
        dir: 'ltr',
        title: 'Privacidade e política de cookies',
        text: Text,
        accept: Accept,
        reject: null,
        id: null,
        hidden: false,
        script: latin,
        service: 'news',
    };

    return isMostrar ? (
        <ConsentBanner {...props} />
    ) : null
}

