/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/:short', 'UrlShortenerController.show');
Route.post('/', 'UrlShortenerController.store').validator('urlShortener/postUrlShortener');