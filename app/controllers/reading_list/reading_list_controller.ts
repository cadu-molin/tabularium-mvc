// app/controllers/reading_list/reading_list_controller.ts

import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReadingListService from '#services/reading_list/reading_list_service'
import Book from '#models/book'
import type { Result } from '#types/result'
import { RequestError } from '#dto/request_error'
import { ReadingListFormDTO } from '#dto/reading_list/reading_list_form_dto'

@inject()
export default class ReadingListController {
  constructor(protected readingListService: ReadingListService) {}

  // Lista todas as listas do usuário
  async index({ inertia, auth }: HttpContext) {
    const lists = await this.readingListService.getAllByUser(auth.user!.id)
    return inertia.render('reading_lists/index', { lists })
  }

  // Renderiza form de criação
  async create({ inertia }: HttpContext) {
    const allBooks = await Book.query().select(['id', 'title'])
    return inertia.render('reading_lists/create', { allBooks })
  }

  // Cria nova lista
  async store({ request, auth, response, session }: HttpContext) {
    try {
      const data = request.only(['name', 'description'])
      const bookIds = request.input('book_ids', [])
      const list = await this.readingListService.create(data, auth.user!.id)
      if (bookIds && Array.isArray(bookIds) && bookIds.length > 0) {
        await list.related('books').attach(bookIds)
      }
      return response.redirect().toRoute('reading-lists.index')
    } catch (error) {
      // Trata erro de unicidade
      if (error.code === '23505' || (error.message && error.message.includes('unicidade'))) {
        session.flash('errors', { name: 'Já existe uma lista com esse nome.' })
        session.flash('old', request.only(['name', 'description', 'book_ids']))
        return response.redirect().back()
      }
      // Outros erros
      session.flash('errors', { general: 'Erro ao criar lista.' })
      session.flash('old', request.only(['name', 'description', 'book_ids']))
      return response.redirect().back()
    }
  }

  // Renderiza form de edição
  async edit({ params, auth, inertia }: HttpContext) {
    const list = await this.readingListService.getByIdWithBooks(params.id, auth.user!.id)
    const allBooks = await Book.query().select(['id', 'title'])
    return inertia.render('reading_lists/edit', { readingList: list, allBooks })
  }

  // Atualiza lista
  async update({ request, params, auth, response }: HttpContext) {
    try {
      const data : ReadingListFormDTO = request.only(['name', 'description'])
      const addBooks: number[] = request.input('add_books', [])
      const removeBooks: number[] = request.input('remove_books', [])

      const list = await this.readingListService.update(params.id, data, auth.user!.id)

      // Adicionar livros
      if (addBooks && addBooks.length > 0) {
        await list.related('books').attach(addBooks)
      }
      // Remover livros
      if (removeBooks && removeBooks.length > 0) {
        await list.related('books').detach(removeBooks)
      }

      // Redireciona para a página da lista editada
      return response.redirect().toRoute('reading-lists.show', { id: params.id })
    } catch (error) {
      return response.internalServerError({ success: false, error: { message: error.message } })
    }
  }

  // Exclui lista
  async destroy({ params, auth, response }: HttpContext) {
    await this.readingListService.delete(params.id, auth.user!.id)
    return response.noContent()
  }

  // Mostra uma lista com seus livros
  async show({ params, auth, inertia }: HttpContext) {
    const list = await this.readingListService.getByIdWithBooks(params.id, auth.user!.id)
    return inertia.render('reading_lists/show', { readingList: list })
  }

  // Adiciona um livro à lista
  async addBook({ request, params, auth, response }: HttpContext) {
    const bookId = request.input('book_id')
    await this.readingListService.addBook(params.id, bookId, auth.user!.id)
    return response.redirect().toRoute('reading-lists.edit', { id: params.id })
  }

  // Remove um livro da lista
  async removeBook({ params, auth, response }: HttpContext) {
    const bookId = params.bookId
    await this.readingListService.removeBook(params.id, bookId, auth.user!.id)
    return response.redirect().toRoute('reading-lists.edit', { id: params.id })
  }
}
