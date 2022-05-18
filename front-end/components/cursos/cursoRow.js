import Styles from '../../styles/cursos.module.css';

export default function CursoRow({ nome, resumo, preco }) {
    return (
        <div className={`${Styles.divCurso} margem5`}>
            <span className={Styles.topico}>{nome}</span>

            <div className={`${Styles.divDescCurso} margem10`}>
                <span className='texto'>{resumo}</span>
                <span className='texto'>R$ {preco}</span>
            </div>
        </div>
    )
}