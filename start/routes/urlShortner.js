/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('url/shorts/:short', 'UrlShortenerController.show').validator('getUrlShortener')
Route.post('url/shorts', 'UrlShortenerController.store').validator('postUrlShortener')