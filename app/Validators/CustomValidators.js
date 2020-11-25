const Validator = use('Validator')

const urlRegex = require('url-regex');

const validUrlFn = async (data, field, message) => {
    const value = data[field];
    // let required handle if field is empty
    if (!value) {
        return true;
    }

    // url is too long
    if (value.length > 2048) {
        throw message;
    }

    if (urlRegex({ exact: true, strict: true }).test(value)) {
        return true;
    }

    throw message;
}

Validator.extend('validUrl', validUrlFn)