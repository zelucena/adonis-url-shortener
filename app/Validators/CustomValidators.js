const Validator = use('Validator');
const Database = use('Database');
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

    if (urlRegex({ exact: true, strict: false }).test(value)) {
        return true;
    }

    throw message;
}

Validator.extend('validUrl', validUrlFn);

/**
 * Checkes whether a field already exists in the table.
 * Optional: Pass a second field / value to ignore. Use this if patching an entry 
 * usage: notExists:table_name|field_name|field_to_ignore|value_to_ignore
 * This was adapted from the docs example
 * @see https://adonisjs.com/docs/4.1/validator
 * @param {*} data all data from request body
 * @param {*} field field name
 * @param {*} message Error message
 * @param {*} args arguments passed during validation
 * @param {*} get 
 */
const notExistsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
        // let required handle if field is empty
        return;
    }
    const [table, column, fieldToFilter, valueToFilter, secondValue] = args;
    let row = Database.table(table);

    if (fieldToFilter !== undefined && valueToFilter !== undefined) {
        row.where(fieldToFilter, valueToFilter);
    }

    if (!value && !secondValue) {
        return;
    }

    row = await row.where(column, value || secondValue).first();

    if (row) {
        throw message;
    }
};

Validator.extend('notExists', notExistsFn);