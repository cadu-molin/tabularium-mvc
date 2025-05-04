/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import authRoute from './routes/auth_route.js'

router.on('/').renderInertia('home').as('home')

router.group(authRoute(router)).prefix('auth').as('auth')
