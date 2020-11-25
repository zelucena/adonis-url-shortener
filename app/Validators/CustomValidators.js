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

    if (urlRegex({ exact: true, strict: true }).test(value)) {
        return true;
    }

    throw message;
}

Validator.extend('validUrl', validUrlFn);

const notExistsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    // eslint-disable-next-line
    if (!value) {
        //   /**
        //    * skip validation if value is not defined. `required` rule
        //    * should take care of it.
        //    */
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