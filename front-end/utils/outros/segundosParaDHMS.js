export default function segundosParaDHMS(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d === 1 ? ' dia' : ' dias') : '';
    var hDisplay = h > 0 ? h + (h === 1 ? ' hora' : ' horas') : '';
    var mDisplay = m > 0 ? m + (m === 1 ? ' minuto' : ' minutos') : '';
    var sDisplay = s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : '';

    var retorno = '';
    if (dDisplay) {
        retorno = dDisplay;
    } else if (hDisplay) {
        retorno = hDisplay;
    } else if (mDisplay) {
        retorno = mDisplay;
    } else if (sDisplay) {
        retorno = sDisplay;
    } else {
        return 'agora mesmo';
    }

    // return seconds + ' - ' + dDisplay + hDisplay + mDisplay + sDisplay;
    return 'há ' + retorno;
}