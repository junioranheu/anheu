import Image from 'next/image';
import React, { Fragment } from 'react';
import Styles from '../../styles/itemRow.module.css';

export default function ItemRow({ data, id, titulo, descricao, itemzinho, itemzao, isMostrarItemzao, handleClick, idReferenciaParaAlterarCor, tags, imagem }) {

    function exibirTagsDisciplinas(disciplinaTags) {
        let tags = '';
        disciplinaTags.forEach(function (d, index) {
            // console.log(d);
            tags += `<span class='tag' key='${d.disciplinaTagId}'}>${d.tag}</span>`;
        });

        return (
            <div className={Styles.divTags} dangerouslySetInnerHTML={{ __html: tags }}></div>
        )
    }

    return (
        <div className={`${Styles.divCurso} margem5`} onClick={() => (handleClick ? handleClick(data) : null)}>
            {
                imagem && (
                    <Image
                        className={Styles.thumb}
                        src={imagem}
                        width={250}
                        height={250}
                        alt=''
                    />
                )
            }

            <div className={Styles.divDescCurso}>
                <span className={Styles.topico}>
                    <span className={`${(id == idReferenciaParaAlterarCor ? 'cor-principal' : '')}`}>
                        {titulo}
                    </span>

                    {
                        itemzinho && (
                            <Fragment>
                                &nbsp;<span className='efeito-new texto'>{itemzinho}</span>
                            </Fragment>
                        )
                    }
                </span>

                <span className='texto'>{descricao}</span>

                {
                    tags && (
                        <div>
                            {exibirTagsDisciplinas(tags)}
                        </div>
                    )
                }
            </div>

            {
                isMostrarItemzao && (
                    <span className={Styles.topico}>{itemzao}</span>
                )
            }
        </div>
    )
}