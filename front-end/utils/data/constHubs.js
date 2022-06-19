import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    CHAT: 'Hubs/ChatHub'
};

const DEV = {
    HUBS_CHAT: `${API_BASE_URL_DEV}/${ENDPOINTS.CHAT}`
};

const PROD = {
    HUBS_CHAT: `${API_BASE_URL_PROD}/${ENDPOINTS.CHAT}`
};
 
// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;