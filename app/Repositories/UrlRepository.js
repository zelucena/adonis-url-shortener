const Url = use('App/Models/Url');
const generator = require('generate-password');

class UrlRepository {
    /**
     * generates pseudo-random short and checkes whether it exists. If so, generate another
     */
    async _generateShort() {
        const short = generator.generate({
            length: 10,
            numbers: true,
        });

        const url = await this.findByShort(short);

        if (url) {
            return this._generateShort();
        }
        return short;
    }

    /**
     * Fetch a single URL by its short
     * @param {string} short
     */
    async findByShort(short) {
        return Url.query().where('short', short).first();
    }

    /**
     * Persist a url by passing its data. Optional: transction
     * @param {Object} data URL data
     * @param {Object} [trx] Transaction object
     */
    async save(data, trx) {
        let { short, long } = data;

        if (!short) {
            short = await this._generateShort();
        }

        const url = new Url();
        url.merge({ long, short });
        await url.save(data, trx);
        return url;
    }
}

module.exports = UrlRepository;