import NProgress from 'nprogress';
import { Aviso } from '../../components/outros/aviso';
import CONSTANTS_USUARIOS from '../../utils/data/constUsuarios';
import { Fetch } from '../../utils/outros/fetch';

export default async function verificarEmailENomeUsuario(form, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isNovoEmail, isNovoNomeUsuario) {
    const urlIsExisteEmail = `${CONSTANTS_USUARIOS.API_URL_GET_IS_EXISTE_EMAIL}?email=${form.email}`;
    const urlIsExisteNomeUsuario = `${CONSTANTS_USUARIOS.API_URL_GET_IS_EXISTE_NOME_USUARIO}?nomeUsuarioSistema=${form.nomeUsuarioSistema}`;
    let isContinuar = true;

    // Verificar e-mail;
    if (isNovoEmail) {
        const isJaExiste = await Fetch.getApi(urlIsExisteEmail, null);
 
        if (isJaExiste) {
            NProgress.done();
            Aviso.warn('Existe outro usuário que já está usando este e-mail!', 5000);
            refEmail.current.select();
            refSenha.current.value = '';
            refConfirmarSenha.current.value = '';
            form.senha = '';

            isContinuar = false;
        }
    }

    // Verificar nome de usuário;
    if (isNovoNomeUsuario) {
        if (isContinuar) {
            const isJaExiste = await Fetch.getApi(urlIsExisteNomeUsuario, null);

            if (isJaExiste) {
                NProgress.done();
                Aviso.warn('Existe outro usuário que já está usando este nome de usuário!', 5000);
                refNomeUsuario.current.select();
                refSenha.current.value = '';
                refConfirmarSenha.current.value = '';
                form.senha = '';

                isContinuar = false;
            }
        }
    }

    return isContinuar;
}
