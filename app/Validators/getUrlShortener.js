'use strict'

class GetUrlShortener {
    get rules() {
        return {

        }
    }

    get sanitizationRules() {
        return {

        }
    }

    get validateAll() {
        return true;
    }

    get messages() {
        return {

        }
    }

    async fails(errorMessages) {
        return this.ctx.response.send(errorMessages)
    }

}

module.exports = GetUrlShortener