import Styles from '../../styles/card.module.css';
import Botao from './botao';

export default function Banner({ titulo, subtitulo, textoBotao, url }) {
    return (
        <section className={Styles.banner}>
            <span className={Styles.cardTitulo}>{titulo}</span>
            <span className={Styles.cardSubtitulo}><span dangerouslySetInnerHTML={{ __html: subtitulo }} /></span>

            <div className={Styles.botaoCustomBanner}>
                <Botao texto={textoBotao} url={url} isNovaAba={false} Svg='' refBtn={null} />
            </div>
        </section>
    )
}