import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import BookReview from './book_review.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ReadingList from './reading_list.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['login'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static get table() {
    return 'user'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare login: string

  @column({ serializeAs: null })
  declare password: string

  @hasMany(() => BookReview)
  declare bookReviews: HasMany<typeof BookReview>

  @hasMany(() => ReadingList)
  declare readingLists: HasMany<typeof ReadingList>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
