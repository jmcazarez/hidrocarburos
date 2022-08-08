'use strict';

const CryptoJS = require("crypto-js");

const ENCRYPTION_KEY = CryptoJS.enc.Utf8.parse('416424756d505744'); // Ad$umPWD (en hexadecimal)
const IV_KEY = CryptoJS.enc.Utf8.parse('416424756d49562e') // Ad$umIV. (en hexadecimal)

function encrypt(text) {
    
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), ENCRYPTION_KEY,
    {
            keySize: 128 / 8,
            iv: IV_KEY,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
}

function decrypt(text) {

    var decrypted = CryptoJS.AES.decrypt(text, ENCRYPTION_KEY,
        {
            keySize: 128 / 8,
            iv: IV_KEY,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { 
    decrypt, 
    encrypt 
};