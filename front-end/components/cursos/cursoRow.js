import Styles from '../../styles/cursos.module.css';

export default function CursoRow({ curso, handleClick }) {
    // console.log(curso);

    return (
        <div className={`${Styles.divCurso} margem5`} onClick={() => (handleClick ? handleClick(curso) : null)}>
            <div className={Styles.divDescCurso}>
                <span className={Styles.topico}>{curso.nome} <span className='efeito-new texto'>Professor {curso.professor}</span></span>
                <span className='texto'>{curso.resumoCurso}</span>
            </div>

            <span className={Styles.topico}>R$ {curso.preco}</span>
        </div>
    )
}