import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    // "Não-protegido", arquivos da pasta Upload, que estão liberados;
    GET_AULAS_THUMBNAIL: 'Upload/aulas/imagem',
    GET_CURSOS_CATEGORIAS: 'Upload/cursosCategorias/imagem',

    // "Protegidos", arquivos que estaõ na pasta UploadProtegido e devem ser chamados pela API;
    GET_AULAS_VIDEO_PROTEGIDO: 'api/Uploads/getArquivoProtegido',
};

const DEV = {
    API_URL_GET_AULAS_THUMBNAIL: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AULAS_THUMBNAIL}`,
    API_URL_GET_AULAS_VIDEO_PROTEGIDO: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AULAS_VIDEO_PROTEGIDO}`,
    API_URL_GET_CURSOS_CATEGORIAS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_CURSOS_CATEGORIAS}`
};

const PROD = {
    API_URL_GET_AULAS_THUMBNAIL: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AULAS_THUMBNAIL}`,
    API_URL_GET_AULAS_VIDEO_PROTEGIDO: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AULAS_VIDEO_PROTEGIDO}`,
    API_URL_GET_CURSOS_CATEGORIAS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_CURSOS_CATEGORIAS}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;