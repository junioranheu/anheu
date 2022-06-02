import Moment from 'moment';
import 'moment/locale/pt-br'; // Traduzir moment;

export default function formatarData(data) {
    const dataFormatada = Moment(data).locale('pt-br').format('DD [de] MMMM [de] YYYY, [às] HH:mm:ss');

    return dataFormatada;
}

