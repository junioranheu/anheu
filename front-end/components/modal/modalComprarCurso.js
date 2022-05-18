import React, { useContext } from 'react';
import { Aviso } from '../../components/outros/aviso';
import Styles from '../../styles/modal.module.css';
import { Auth, UsuarioContext } from '../../utils/context/usuarioContext';
import CONSTANTS_USUARIOS_CURSOS from '../../utils/data/constUsuariosCursos';
import { Fetch } from '../../utils/outros/fetch';
import HorarioBrasilia from '../../utils/outros/horarioBrasilia';
import Botao from '../outros/botao';
import BotaoFecharModal from '../svg/botaoFecharModal';

export default function ModalComprarCurso({ handleModal, cursoSelecionado }) {
    // console.log(cursoSelecionado);
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    function fecharModalClicandoNoBotao() {
        handleModal();
    }

    function fecharModalClicandoNoFundo(e) {
        // console.log(e.target);
        if (e.target.className.toString().includes('fundo')) {
            // handleModal();
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
            DataRegistro: HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
        }

        const url = CONSTANTS_USUARIOS_CURSOS.API_URL_POST_CRIAR;
        const token = Auth.getUsuarioLogado().token;

        let resposta = await Fetch.postApi(url, data, token);
        if (!resposta) {
            Aviso.error('Algo deu errado ao finalizar a compra<br/><br/>Verifique se você já adquiriu este curso, e, caso necessário, informe ao administrador!', 10000);
            return false;
        }

        alert(cursoSelecionado.cursoId);
    }

    return (
        <div className={Styles.fundo} onMouseDown={(e) => fecharModalClicandoNoFundo(e)}>
            <div className={`${Styles.modal} ${Styles.modalGrande} animate__animated animate__fadeInUp animate__faster`}>
                <div className={Styles.divCabecalho}>
                    <BotaoFecharModal style={Styles} height='16px' width='16px' fecharModal={() => fecharModalClicandoNoBotao()} />

                    {/* <div className={Styles.cabecalhoTitulo}>
                        <span>xxx</span>
                    </div> */}
                </div>

                <div className={Styles.divPrincipal}>
                    <h2 className={Styles.titulo}>
                        Finge que aqui tem um modal para comprar o curso <span className='cor-principal'>{cursoSelecionado.nome}</span> (id {cursoSelecionado.cursoId})
                    </h2>

                    <div className={Styles.conteudo}>
                        {/* <ul className={Styles.itens}>
                            {
                                Idiomas('idioma').map((item, i) => (
                                    <li className={Styles.itemLi} key={item.id} onClick={() => handleClick(item)}>
                                        <a className={`${Styles.itemA} ${(props.idiomaSelecionado.id === item.id ? Styles.itemASelecionado : '')}`}>
                                            <div>{item.idioma}</div>
                                            <div>{item.regiao}</div>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul> */}

                        <div className={Styles.botaoCustom} onClick={() => funcaoTemporariaComprarCurso(cursoSelecionado)} >
                            <Botao texto={'Comprar curso'} url={''} isNovaAba={false} Svg='' refBtn={null} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}