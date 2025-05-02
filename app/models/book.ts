import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'

import Publisher from './publisher.js'
import Author from './author.js'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare edition: string

  @column()
  declare releaseDate: Date | null

  @column()
  declare publisherId: number

  @belongsTo(() => Publisher)
  declare publisher: BelongsTo<typeof Publisher>

  @manyToMany(() => Author, {
    pivotTable: 'book_authors',
  })
  declare author: ManyToMany<typeof Author>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
