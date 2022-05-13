import Image from 'next/image';
import Styles from '../../styles/card.module.css';

export default function Card({ Svg, Img, titulo, subtitulo, url }) {
    return (
        <section className={Styles.card} onClick={() => { window.open(url, '_self') }}>
            {Svg && (
                <div className={Styles.cardDivMedia}>
                    {Svg}
                </div>
            )}

            {Img && (
                <div className={Styles.cardDivMedia}>
                    <Image src={Img} alt=''/>
                </div>
            )}

            <div className={Styles.cardDivTexto}>
                <span className={Styles.cardTitulo}>{titulo}</span>
                <span className={Styles.cardSubtitulo}>{subtitulo}</span>
            </div>
        </section>
    )
}