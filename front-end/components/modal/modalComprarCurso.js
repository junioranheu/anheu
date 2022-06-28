import { useContext, useRef, useState } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/modal.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import Botao from '../outros/botao';
import BotaoFecharModal from '../svg/botaoFecharModal';

export default function ModalComprarCurso({ handleModal, cursoSelecionado }) {
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

    async function funcaoTemporariaComprarCurso(cursoSelecionado) {
        if (!isAuth) {
            Aviso.warn('Você deve entrar em sua conta para continuar com esta compra', 5000);
            return false;
        }

        // Processo de "compra";
        const data = {
            UsuarioId: Auth.getUsuarioLogado().usuarioId,
            CursoId: cursoSelecionado.cursoId,
            IsAtivo: 1,
            DataRegistro: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        }

        const url = CONSTANTS_USUARIOS_CURSOS.API_URL_POST_CRIAR;
        const token = Auth.getUsuarioLogado().token;

        let resposta = await Fetch.postApi(url, data, token);
        if (!resposta) {
            Aviso.error('Algo deu errado ao finalizar a compra<br/><br/>Verifique se você já adquiriu este curso, e, caso necessário, informe ao administrador!', 10000);
            refBtnComprar.current.disabled = true;
            return false;
        }

        alert(`Curso ${cursoSelecionado.cursoId} adquirido`);
        handleModal();
    }

    return (
        <div className={Styles.fundo} onMouseDown={(e) => fecharModalClicandoNoFundo(e)}>
            <div className={animarDiv}>
                <div className={`${Styles.modal} animate__animated animate__fadeInUp animate__faster`}>
                    <div className={Styles.divCabecalho}>
                        <BotaoFecharModal style={Styles} height='16px' width='16px' fecharModal={() => fecharModalClicandoNoBotao()} />

                        {/* <div className={Styles.cabecalhoTitulo}>
                            <span>xxx</span>
                        </div> */}
                    </div>

                    <div className={Styles.divPrincipal}>
                        <h2 className={Styles.titulo}>
                            <span className='cor-principal'>{cursoSelecionado?.nome}</span>
                        </h2>

                        <div className={Styles.conteudo}>                 
                            <span>{cursoSelecionado?.resumoCurso}</span>
                            <br />
                            <br />
                            <span>Curso sobre {cursoSelecionado?.cursosCategorias?.categoria.toLowerCase()}</span>
                      
                            <h2 className={Styles.titulo}>
                                <span className='cor-principal'>R$ {cursoSelecionado?.preco}</span>
                            </h2>

                            <div className={`${Styles.conteudo} flexCenter margem40`}>
                                <div className={Styles.botaoCustom} onClick={() => funcaoTemporariaComprarCurso(cursoSelecionado)} >
                                    <Botao texto={'Comprar curso'} url={''} isNovaAba={false} Svg='' refBtn={refBtnComprar} isEnabled={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}