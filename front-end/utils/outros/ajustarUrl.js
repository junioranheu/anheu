function ajustarUrl(url) {
    // console.log(url);
    let urlAjustada = url.normalize('NFD').replace(/\p{Diacritic}/gu, ''); // Remover acentuação e letras estranhas;
    urlAjustada = urlAjustada.replace(/\s+/g, '-').toLowerCase(); // Trocar espaços por traços e deixar em minúsculo;

    return urlAjustada;
}

export default ajustarUrl;