export default function Botao({ texto, url, isNovaAba, Svg }) {
    function abrirUrl() {
        // console.log(isNovaAba);

        if (isNovaAba) {
            window.open(url, '_blank');
        } else {
            window.open(url, '_self');
        }
    }

    return (
        <button className='botao' onClick={() => abrirUrl()}>{Svg ? Svg : ''}{texto}</button>
    )
}