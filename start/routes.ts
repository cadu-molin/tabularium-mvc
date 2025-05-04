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
import homeRoute from './routes/home_route.js'
import profileRoute from './routes/profile_route.js'
import { middleware } from './kernel.js'

router.group(homeRoute(router)).as('home')
router.group(authRoute(router)).prefix('auth').as('auth')
router.group(profileRoute(router)).prefix('profile').as('profile').use(middleware.auth())
