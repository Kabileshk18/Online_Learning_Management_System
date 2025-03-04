const CryptoJS = require('crypto-js');
/**
 * Author: Kabilesh K
 * Created On: 27.02.2025
 * Modified On: 27.02.2025
 * Reviewed By: -
 * Description: Method which is used to encrypt the generated token.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const encrypt = async (plaintext) => {
    let chiperText;
    chiperText = CryptoJS.AES.encrypt(plaintext.toString(), CONFIG.secretkey).toString();
    console.log(chiperText);
    return chiperText;
}
module.exports.encrypt = encrypt;
/**
 * Author: Kabilesh K
 * Created On: 27.02.2025
 * Modified On: 27.02.2025
 * Reviewed By: -
 * Description: Method which is used to decrypt the retrieved token.
 * @param req To define the HTTPS request.
 * @param res To define the HTTPS response.
 * @returns If error occurs then return error response.
 * Otherwise return the success response.
 */
const decrypt = function (chiperText) {
    let plainText;
    const bytes = CryptoJS.AES.decrypt(chiperText.toString(), CONFIG.secretkey);
    plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}
module.exports.decrypt = decrypt;