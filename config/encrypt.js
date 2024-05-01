// Função para criptografar uma string usando AES
exports.encryptAES = (text) => {
    return btoa(text);
}
  
// Função para descriptografar uma string usando AES
exports.decryptAES = (encryptedData) => {
    return atob(encryptedData);
}
  