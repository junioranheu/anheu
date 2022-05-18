import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/UsuariosCursos/todos',
    GET_POR_ID: 'api/UsuariosCursos',
    POST_CRIAR: 'api/UsuariosCursos/criar',
    POST_ATUALIZAR: 'api/UsuariosCursos/atualizar',
    POST_DELETAR: 'api/UsuariosCursos/deletar',
    GET_POR_USUARIO_ID: 'api/UsuariosCursos/porUsuarioId'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_DELETAR}`,
    API_URL_GET_POR_USUARIO_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_USUARIO_ID}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_DELETAR}`,
    API_URL_GET_POR_USUARIO_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_USUARIO_ID}`
};
 
// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;