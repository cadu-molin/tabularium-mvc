import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

import User from './user.js'
import Book from './book.js'
import Rating from '../types/rating.js'

export default class BookReview extends BaseModel {
  public static get table() {
    return 'book_review'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare review: string

  @column({ consume: (value) => Rating.create(value) })
  declare rating: Rating

  @column()
  declare userId: number

  @column()
  declare bookId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
