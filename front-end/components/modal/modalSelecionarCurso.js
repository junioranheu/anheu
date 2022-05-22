import Router from 'next/router';
import NProgress from 'nprogress';
import React, { useContext, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/modal.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';
import Botao from '../outros/botao';
import BotaoFecharModal from '../svg/botaoFecharModal';

export default function ModalSelecionarCurso({ handleModal, cursoSelecionado, getCursoDefinidoAtual }) {
    // console.log(cursoSelecionado);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const usuarioId = isAuth ? Auth?.getUsuarioLogado()?.usuarioId : null;
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

        NProgress.start();

        // Definir curso como atual;
        const url = `${CONSTANTS_USUARIOS_CURSOS.API_URL_POST_DEFINIR_CURSO_COMO_ATUAL}?usuarioId=${usuarioId}&cursoId=${cursoSelecionado.cursoId}`;
        const token = Auth.getUsuarioLogado().token;
        const resposta = await Fetch.postApi(url, null, token);

        if (!resposta) {
            NProgress.done();
            Aviso.error('Algo deu errado ao definir este curso como o atual', 5000);
            return false;
        }

        Aviso.success(`O curso <b class="cor-principal">${cursoSelecionado.nome}</b> foi definido como o atual`, 5000);
        getCursoDefinidoAtual(); // Atualizar o curso definido em meus-cursos.js;
        handleModal();
        NProgress.done();
        Router.push({ pathname: '/disciplinas'});
    }

    return (
        <div className={Styles.fundo} onMouseDown={(e) => fecharModalClicandoNoFundo(e)}>
            <div className={animarDiv}>
                <div className={`${Styles.modal} animate__animated animate__fadeInUp animate__faster`}>
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