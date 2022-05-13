import Styles from '../../styles/card.module.css';

export default function CardGrande({ tituloInicial, titulo, subtitulo,  url }) {
    return (
        <section className={Styles.card} onClick={() => { window.open(url, '_self') }}>
            <div className={Styles.cardDivTextoGrande}>
                <span className={Styles.cardTituloInicial}>{tituloInicial}</span>
                <span className={Styles.cardTituloGrande}>{titulo}</span>
                <span className={Styles.cardSubtituloGrande}><span dangerouslySetInnerHTML={{ __html: subtitulo }} /></span>
            </div>
        </section>
    )
}