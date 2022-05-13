function concatenarItensLista(lista, objetoCaminho) {
    let itens = '';
    const limite = 3;
    let contador = 0;
    let isPassouLimite = false;

    lista.forEach(function (item, index) {
        // console.log(item);

        if (contador <= (limite - 1)) {
            const nome = recompose(item, objetoCaminho);
            // console.log(nome);

            if (!itens.includes(nome)) {
                itens = itens + `, ${nome}`;
                contador++;
            }
        } else {
            isPassouLimite = true;
        }
    });

    itens = itens.replace(', ', '');

    // Se passou do limite...
    if (isPassouLimite) {
        itens = itens + ' e mais';
    }

    return itens;
}

// Concatenar a lista + o "resto do caminho" para o objeto: resposta de joekarl, https://stackoverflow.com/questions/6393943/convert-a-javascript-string-in-dot-notation-into-an-object-reference;
function recompose(obj, string) {
    var parts = string.split('.');
    var newObj = obj[parts[0]];

    if (parts[1]) {
        parts.splice(0, 1);
        var newString = parts.join('.');

        return recompose(newObj, newString);
    }

    return newObj;
}

export default concatenarItensLista;