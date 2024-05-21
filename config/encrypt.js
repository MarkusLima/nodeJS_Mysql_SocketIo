// Função para criptografar uma string usando AES
exports.encryptAES = (text) => {
    try {
        
        return btoa(text);

    } catch (error) {

        console.log(error)
        return false;
        
    }
}
  
// Função para descriptografar uma string usando AES
exports.decryptAES = (encryptedData) => {
    try {
        
        return atob(encryptedData);

    } catch (error) {

        console.log(error)
        return false;

    }
}
  