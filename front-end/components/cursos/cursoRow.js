import Styles from '../../styles/cursos.module.css';

export default function CursoRow({ curso, handleClick }) {
    // console.log(curso);

    return (
        <div className={`${Styles.divCurso} margem5`} onClick={() => handleClick(curso)}>
            <span className={Styles.topico}>{curso.nome}</span>

            <div className={`${Styles.divDescCurso} margem10`}>
                <span className='texto'>{curso.resumo}</span>
                <span className='texto'>R$ {curso.preco}</span>
            </div>
        </div>
    )
}