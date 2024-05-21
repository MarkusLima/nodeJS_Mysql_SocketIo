function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function gerarLetrasAleatorias(comprimento) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let resultado = '';
    
    for (let i = 0; i < comprimento; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        resultado += letras[indiceAleatorio];
    }
    
    return resultado;
}

/**
 * Verifica se já passou um dia após a data fornecida.
 * @param {string} isoDate - A data no formato ISO 8601.
 * @returns {boolean} True se já passou um dia após a data, false caso contrário.
 */
function passouUmDia(isoDate) {
    // Converte a string da data ISO para um objeto Date
    const date = new Date(isoDate);
    
    // Obtém a data atual
    const now = new Date();
    
    // Calcula a diferença em milissegundos entre a data atual e a data fornecida
    const diffInMs = now - date;
    
    // Calcula a diferença em dias (milissegundos em um dia)
    const oneDayInMs = 24 * 60 * 60 * 1000; // Milissegundos em um dia
    
    // Verifica se a diferença é maior ou igual a um dia
    return diffInMs >= oneDayInMs;
}

function dateNow() {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Meses são baseados em zero (0-11)
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

}

/**
 * Verifica se a string contém tags HTML.
 * @param {string} input - A string a ser verificada.
 * @returns {boolean} True se a string contém tags HTML, false caso contrário.
 */
function containsHtmlTags(input) {
    // Expressão regular para detectar tags HTML
    const htmlTagPattern = /<[^>]*>/;
    
    // Testa a string de entrada contra o padrão
    return htmlTagPattern.test(input);
}

module.exports = { sleep, gerarLetrasAleatorias, passouUmDia, dateNow, containsHtmlTags };