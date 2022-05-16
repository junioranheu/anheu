import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/CursosCategorias/todos',
    GET_POR_ID: 'api/CursosCategorias',
    POST_CRIAR: 'api/CursosCategorias/criar',
    POST_ATUALIZAR: 'api/CursosCategorias/atualizar',
    POST_DELETAR: 'api/CursosCategorias/deletar'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_DELETAR}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_POST_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ATUALIZAR}`,
    API_URL_POST_DELETAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_DELETAR}`
};
 
// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;