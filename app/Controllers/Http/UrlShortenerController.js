'use strict'

const UrlRepository = use('App/Repositories/UrlRepository');
const Logger = use('Logger');
const URI = require("uri-js");

class UrlShortenerController {
    /**
     * GET /url/shorts/:short
     * Using adonis default naming system for http verb get/:entity_id
     * @param {Object} params URI params. Expected URL to be shortened
     * @param {Object} response Response object. Allows to set HTTP status and send some JSON response
     */
    async show({ params, response }) {
        const { short } = params;
        try {
            const urlRepository = new UrlRepository();
            const url = await urlRepository.findByShort(short);

            if (!url) {
                return response.status(404).send({ message: 'URL not found' });
            }

            let uri = URI.parse(url.long);

            // imply HTTP protocol if host can't be resolved properly
            if (!uri.scheme) {
                uri = URI.serialize({ scheme: 'http', host: url.long });
            } else {
                uri = URI.serialize(uri);
            }
            // sends default HTTP status 302 FOUND
            response.redirect(uri);

            return response;
        } catch (e) {
            Logger.error('', e);
            return response.status(500).send({ messsage: 'There was an internal error. Your data could not be fetched' });
        }
    }

    /**
     * POST /url/shorts/
     * Using adonis default naming system for http verb post/:entity_id
     * @param {Object} request 
     * @param {Object} response
     */
    async store({ request, response }) {
        const { short, long } = request.post();
        try {
            const urlRepository = new UrlRepository();

            const url = await urlRepository.save({ short, long });

            return response.status(201).send(url);
        } catch (e) {
            Logger.error('', e);
            return response.status(500).send({ messsage: 'There was an internal error. Your data could not be stored' });
        }

    }
}

module.exports = UrlShortenerController
