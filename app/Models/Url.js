'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Url extends Model {
    static boot() {
        super.boot();
        this.addTrait('NoTimestamp');
    }

    static get table() {
        return 'url'
    }

    static get hidden() {
        return ['id'];
    }
}

module.exports = Url;
