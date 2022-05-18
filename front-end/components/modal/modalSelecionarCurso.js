import React, { useContext, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/modal.module.css';
import { UsuarioContext } from '../../utils/context/usuarioContext';
import Botao from '../outros/botao';
import BotaoFecharModal from '../svg/botaoFecharModal';

export default function ModalSelecionarCurso({ handleModal, cursoSelecionado }) {
    // console.log(cursoSelecionado);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const refBtnComprar = useRef();

    function fecharModalClicandoNoBotao() {
        handleModal();
    }

    const [animarDiv, setAnimarDiv] = useState('');
    function fecharModalClicandoNoFundo(e) {
        // console.log(e.target);
        if (e.target.className.toString().includes('fundo')) {
            // handleModal();
            setAnimarDiv('animate__animated animate__shakeX');

            setTimeout(function () {
                setAnimarDiv('');
            }, 1000);
        }
    }

    async function handleDefinirCursoComoAtual(cursoSelecionado) {
        if (!isAuth) {
            Aviso.warn('Você deve entrar em sua conta para definir este curso como o atual', 5000);
            return false;
        }

        alert('aea');
    }

    return (
        <div className={Styles.fundo} onMouseDown={(e) => fecharModalClicandoNoFundo(e)}>
            <div className={animarDiv}>
                <div className={`${Styles.modal} ${Styles.modalGrande} animate__animated animate__fadeInUp animate__faster`}>
                    <div className={Styles.divCabecalho}>
                        <BotaoFecharModal style={Styles} height='16px' width='16px' fecharModal={() => fecharModalClicandoNoBotao()} />
                    </div>

                    <div className={Styles.divPrincipal}>
                        <h2 className={Styles.titulo}>
                            Deseja definir o curso <span className='cor-principal'>{cursoSelecionado.nome}</span> como o seu curso atual?
                        </h2>

                        <span className={Styles.subTitulo}>
                            Você não irá perder nenhum progresso de outro curso!
                        </span>

                        <div className={`${Styles.conteudo} flexCenter margem40`}>
                            <div className={Styles.botaoCustom} onClick={() => handleDefinirCursoComoAtual(cursoSelecionado)} >
                                <Botao texto={'Sim, quero definir este curso como o atual'} url={''} isNovaAba={false} Svg='' refBtn={refBtnComprar} isEnabled={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}