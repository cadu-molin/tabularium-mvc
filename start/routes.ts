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
import bookRoute from './routes/book_route.js'
import authorRoute from './routes/author_route.js'
import { middleware } from './kernel.js'
import reviewRoute from './routes/review_route.js'

router.group(homeRoute(router)).as('home').use(middleware.userLogged())
router.group(authRoute(router)).prefix('auth').as('auth')
router.group(profileRoute(router)).prefix('profile').as('profile').use(middleware.auth())
router.group(bookRoute(router)).prefix('book').as('book').use(middleware.auth())
router.group(authorRoute(router)).prefix('author').as('author').use(middleware.auth())
router.group(reviewRoute(router)).prefix('review').as('review').use(middleware.auth())

router.get('*', ({ inertia }) => {
  return inertia.render('errors/not_found')
})
