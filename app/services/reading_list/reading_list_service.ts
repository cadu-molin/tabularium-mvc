import ReadingList from '#models/reading_list'
import Book from '#models/book'
import type { ReadingListFormDTO } from '#dto/reading_list/reading_list_form_dto'

export default class ReadingListService {
  async getAllByUser(userId: number) {
    return ReadingList.query().where('userId', userId)
  }

  async getByIdAndUser(id: number, userId: number) {
    return ReadingList.query().where('id', id).where('userId', userId).firstOrFail()
  }

  async getByIdWithBooks(id: number, userId: number) {
    return ReadingList.query()
      .where('id', id)
      .where('userId', userId)
      .preload('books')
      .firstOrFail()
  }

  async create(data: ReadingListFormDTO, userId: number) {
    return ReadingList.create({ ...data, userId })
  }

  async update(id: number, data: ReadingListFormDTO, userId: number) {
    const list = await this.getByIdAndUser(id, userId)
    list.merge(data)
    await list.save()
    return list
  }

  async delete(id: number, userId: number) {
    const list = await this.getByIdAndUser(id, userId)
    await list.delete()
  }

  async addBook(listId: number, bookId: number, userId: number) {
    const list = await this.getByIdWithBooks(listId, userId)
    const book = await Book.findOrFail(bookId)
    await list.related('books').attach([book.id])
  }

  async removeBook(listId: number, bookId: number, userId: number) {
    const list = await this.getByIdWithBooks(listId, userId)
    await list.related('books').detach([bookId])
  }
}
