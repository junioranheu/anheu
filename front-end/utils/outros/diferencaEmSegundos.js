import Moment from 'moment';

export default function diferencaEmSegundos(dataUm, dataDois) {
    var duracao = Moment.duration(dataUm.diff(dataDois));
    var diferencaHoras = duracao.asSeconds();

    return diferencaHoras;
}

