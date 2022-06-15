export default function estilzarCodigo(codigo) {
    let resultado = codigo.replaceAll('export', `<span class='cor-js-principal'>export</span>`);
    resultado = resultado.replaceAll('default', `<span class='cor-js-principal'>default</span>`);
    resultado = resultado.replaceAll('function', `<span class='cor-js-principal'>function</span>`);
    resultado = resultado.replaceAll('async', `<span class='cor-js-principal'>async</span>`);
    resultado = resultado.replaceAll('/const/g', `<span class='cor-js-principal'>const</span>`);
    resultado = resultado.replaceAll('await', `<span class='cor-js-principal'>await</span>`);
    resultado = resultado.replaceAll('return', `<span class='cor-js-principal'>return</span>`);
    resultado = resultado.replaceAll('fetch', `<span class='cor-js-principal'>fetch</span>`);
    resultado = resultado.replaceAll('import', `<span class='cor-js-principal'>import</span>`);
    resultado = resultado.replaceAll('from', `<span class='cor-js-principal'>from</span>`);
    resultado = resultado.replaceAll('()', `<span class='cor-js-principal'>()</span>`);
    resultado = resultado.replaceAll('{', `<span class='cor-js-principal'>{</span>`);
    resultado = resultado.replaceAll('}', `<span class='cor-js-principal'>}</span>`);
    resultado = resultado.replaceAll('<>', `<span class='cor-js-principal>\<\></span>`);

    return resultado;
}

