import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'

import Publisher from './publisher.js'
import Author from './author.js'
import BookReview from './book_review.js'
import ReadingList from './reading_list.js'

export default class Book extends BaseModel {
  public static get table() {
    return 'book'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare edition: string

  @column()
  declare releaseDate: DateTime | null

  @column()
  declare publisherId: number

  @belongsTo(() => Publisher)
  declare publisher: BelongsTo<typeof Publisher>

  @manyToMany(() => Author, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'book_id',
    pivotRelatedForeignKey: 'author_id',
    pivotTable: 'book_author',
  })
  declare authors: ManyToMany<typeof Author>

  @hasMany(() => BookReview)
  declare reviews: HasMany<typeof BookReview>

  @manyToMany(() => ReadingList, {
    pivotTable: 'reading_list_books',
  })
  declare readingLists: ManyToMany<typeof ReadingList>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
