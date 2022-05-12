import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_AULAS_THUMBNAIL: 'Upload/aulas/thumbnail',
    GET_AULAS_VIDEO: 'Upload/aulas/video'
};

const DEV = {
    API_URL_GET_AULAS_THUMBNAIL: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AULAS_THUMBNAIL}`,
    API_URL_GET_AULAS_VIDEO: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AULAS_VIDEO}`,
};

const PROD = {
    API_URL_GET_AULAS_THUMBNAIL: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AULAS_THUMBNAIL}`,
    API_URL_GET_AULAS_VIDEO: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AULAS_VIDEO}`,
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;