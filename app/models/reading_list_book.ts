import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import ReadingList from './reading_list.js'
import Book from './book.js'

export default class ReadingListBook extends BaseModel {
  public static table = 'reading_list_book' // nome da tabela no banco

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare readingListId: number

  @column()
  declare bookId: number

  @belongsTo(() => ReadingList)
  declare readingList: BelongsTo<typeof ReadingList>

  @belongsTo(() => Book)
  declare book: BelongsTo<typeof Book>
}
