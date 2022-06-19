import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/_urlApi';

const ENDPOINTS = {
    CHAT: 'Hubs/ChatHub',

    POST_ENVIAR_MENSAGEM_TODOS: 'api/Chats/enviarMensagemTodos',
};

const DEV = {
    HUBS_CHAT: `${API_BASE_URL_DEV}/${ENDPOINTS.CHAT}`,
    API_URL_POST_ENVIAR_MENSAGEM_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ENVIAR_MENSAGEM_TODOS}`,
};

const PROD = {
    HUBS_CHAT: `${API_BASE_URL_PROD}/${ENDPOINTS.CHAT}`,
    API_URL_POST_ENVIAR_MENSAGEM_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ENVIAR_MENSAGEM_TODOS}`,
};
  
// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;