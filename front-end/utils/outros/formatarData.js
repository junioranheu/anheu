import Moment from 'moment';
import 'moment/locale/pt-br'; // Traduzir moment;

export default function formatarData(data) {
    var diferencaDias = Moment().diff(data, 'days');
    // console.log(diferencaDias);

    let dataFormatada = '';
    if (diferencaDias === 0) {
        dataFormatada = `Hoje, ${Moment(data).locale('pt-br').format('[às] HH:mm:ss')}`;
    } else if (diferencaDias === 1) {
        dataFormatada = `Ontem, ${Moment(data).locale('pt-br').format('[às] HH:mm:ss')}`;
    } else {
        dataFormatada = Moment(data).locale('pt-br').format('DD [de] MMMM [de] YYYY, [às] HH:mm:ss');
    }

    return dataFormatada;
}

