import Styles from '../../styles/card.module.css';
import Botao from './botao';

export default function CardGigante({ titulo, subtitulo, textoBotao, url }) {
    return (
        <section className={`${Styles.card} ${Styles.cardGigante}`}>
            <div className={Styles.cardDivTextoGigante}>
                <span className={Styles.cardTituloGrande}>{titulo}</span>
                <span className={`${Styles.cardSubtituloGrande} ${Styles.margemP}`}><span dangerouslySetInnerHTML={{ __html: subtitulo }} /></span>
            </div>

            <div className={Styles.botaoCustom}>
                <Botao texto={textoBotao} url={url} isNovaAba={false} Svg='' />
            </div>
        </section>
    )
}