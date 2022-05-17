import Router from 'next/router';
import Styles from '../../styles/card.module.css';
import AjustarUrl from '../../utils/outros/ajustarUrl';

export default function SessaoCardsPequenos({ lista, rota }) {
    // console.log(lista);

    if (!lista.length) {
        return null;
    }

    return (
        <section className={Styles.sessaoCardsPequenos}>
            {
                lista.map((l, i) => (
                    <div
                        key={l.id}
                        className={Styles.divSessaoCardsPequenos}
                        style={{ backgroundImage: `url(${l.imagem})` }}
                        onClick={() => Router.push(`/${rota}/${l.id}/${AjustarUrl(l.titulo)}`)}
                    >
                        <div className={Styles.efeitoBlur}>
                            <span className={Styles.cardTituloMenor}>{l.titulo}</span>
                            <span className={Styles.cardSubtitulo}>{l.desc}</span>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}