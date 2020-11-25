'use strict'

class PostUrlShortener {
    get rules() {
        return {
            long: 'required|string|validUrl',
            short: 'string|max:10',
        }
    }

    get sanitizationRules() {
        return {
            long: 'trim',
            string: 'trm',
        }
    }

    get validateAll() {
        return true;
    }

    get messages() {
        return {
            'long.required': 'Long url is required',
            'long.string': 'Long url should be a valid URL',
            'long.validUrl': 'Long url should be a valid URL with no more than 2048 characters',
            'short.string': 'Short url should be a valid string',
            'short.max': 'Short url should not be longer than 10 characters',
        }
    }

    async fails(errorMessages) {
        return this.ctx.response.status(400).send(errorMessages)
    }
}

module.exports = PostUrlShortener