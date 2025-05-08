import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Book from './book.js'

export default class Author extends BaseModel {
  public static get table() {
    return 'author'
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Book, {
    pivotTable: 'book_author',
  })
  declare books: ManyToMany<typeof Book>
}
