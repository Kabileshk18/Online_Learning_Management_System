const CryptoJS = require('crypto-js');
/**
 * Author: Kabilesh K
 * Created On: 27.02.2025
 * Modified On: 27.02.2025
 * Reviewed By: -
 * Description: Method which is used to encrypt the generated token.
 */
const encrypt = async (plaintext) => {
    let chiperText;
    chiperText = CryptoJS.AES.encrypt(plaintext.toString(), CONFIG.secretkey).toString();
    return chiperText;
}
module.exports.encrypt = encrypt;
/**
 * Author: Kabilesh K
 * Created On: 27.02.2025
 * Modified On: 27.02.2025
 * Reviewed By: -
 * Description: Method which is used to decrypt the retrieved token.
 */
const decrypt = function (chiperText) {
    let plainText;
    const bytes = CryptoJS.AES.decrypt(chiperText.toString(), CONFIG.secretkey);
    plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}
module.exports.decrypt = decrypt;