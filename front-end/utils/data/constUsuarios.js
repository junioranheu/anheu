import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    GET_AUTENTICAR: 'api/Usuarios/autenticar',
    GET_VERIFICAR_EMAIL_E_SENHA: 'api/Usuarios/verificarEmailSenha',
    POST_CRIAR_CONTA_COM_VALIDACOES: 'api/Usuarios/criarComValidacoes',
};

const DEV = {
    API_URL_GET_AUTENTICAR: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AUTENTICAR}`,
    API_URL_GET_VERIFICAR_EMAIL_E_SENHA: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_VERIFICAR_EMAIL_E_SENHA}`,
    API_URL_POST_CRIAR_CONTA_COM_VALIDACOES: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR_CONTA_COM_VALIDACOES}`
};

const PROD = {
    API_URL_GET_AUTENTICAR: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AUTENTICAR}`,
    API_URL_GET_VERIFICAR_EMAIL_E_SENHA: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_VERIFICAR_EMAIL_E_SENHA}`,
    API_URL_POST_CRIAR_CONTA_COM_VALIDACOES: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR_CONTA_COM_VALIDACOES}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;