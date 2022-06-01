import Router from 'next/router';
import Styles from '../../styles/card.module.css';
import ajustarUrl from '../../utils/outros/ajustarUrl';

export default function SessaoCardsPequenos({ lista, rota }) {
    // console.log(lista);

    if (!lista.length) {
        return null;
    }
 
    return (
        <section className={Styles.sessaoCardsPequenos}>
            {
                lista?.map((l, i) => (
                    <div
                        key={l.id}
                        className={Styles.divSessaoCardsPequenos}
                        style={{ backgroundImage: `url(${l.imagem})` }}
                        onClick={() => Router.push(`/${rota}/${l.id}/${ajustarUrl(l.titulo)}`)}
                    >
                        <div className={Styles.efeitoBlur}>
                            <span className={`${Styles.cardTituloMenor} sombraTexto`}>{l.titulo}</span>
                            <span className={`${Styles.cardSubtitulo} sombraTexto`}>{l.desc}</span>
                        </div>
                    </div>
                ))
            }
        </section>
    )
}