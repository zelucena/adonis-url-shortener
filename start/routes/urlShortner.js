/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('url/shorts/:short', 'UrlShortenerController.show');
Route.post('url/shorts', 'UrlShortenerController.store').validator('urlShortener/postUrlShortener');