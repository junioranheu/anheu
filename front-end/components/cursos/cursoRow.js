import React from 'react';
import Styles from '../../styles/cursos.module.css';

export default function CursoRow({ curso, handleClick, isMostrarPreco, cursoDefinidoAtualId }) {
    // console.log(curso);

    return (
        <div className={`${Styles.divCurso} margem5`} onClick={() => (handleClick ? handleClick(curso) : null)}>
            <div className={Styles.divDescCurso}>
                <span className={Styles.topico}>
                    <span className={`${(curso.cursoId == cursoDefinidoAtualId ? 'cor-principal' : '')}`}>
                        {curso.nome}
                    </span>

                    &nbsp;<span className='efeito-new texto'>Professor {curso.professor}</span>
                </span>

                <span className='texto'>{curso.resumoCurso}</span>
            </div>

            {
                isMostrarPreco && (
                    <span className={Styles.topico}>R$ {curso.preco}</span>
                )
            }
        </div>
    )
}