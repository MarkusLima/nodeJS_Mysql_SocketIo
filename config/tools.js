function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function gerarLetrasAleatorias(comprimento) {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    
    for (let i = 0; i < comprimento; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        resultado += letras[indiceAleatorio];
    }
    
    return resultado;
}

module.exports = { sleep, gerarLetrasAleatorias };