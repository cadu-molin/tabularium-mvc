// app/controllers/reading_list_controller.ts

import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ReadingListService from '#services/reading_list/reading_list_service'
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
    return inertia.render('reading_lists/create')
  }

  // Cria nova lista
  async store({ request, auth, response }: HttpContext) {
    
    try {
      const data = request.only(['name', 'description'])
      const list = await this.readingListService.create(data, auth.user!.id)

      const result: Result<ReadingListFormDTO, {}> = {
        success: true,
        data: list,
      }

      return response.ok(result)
    } catch (error) {
      const result: Result<{}, RequestError> = {
        success: false,
        error: { message: error.message },
      }

      return response.internalServerError(result)
    }
  }

  // Renderiza form de edição
  async edit({ params, auth, inertia }: HttpContext) {
    const list = await this.readingListService.getByIdAndUser(params.id, auth.user!.id)
    return inertia.render('reading_lists/edit', { list })
  }

  // Atualiza lista
  async update({ request, params, auth, response }: HttpContext) {
    try {
      const data : ReadingListFormDTO = request.only(['name', 'description'])
      const list = await this.readingListService.update(params.id, data, auth.user!.id)

      const result: Result<ReadingListFormDTO, {}> = {
        success: true,
        data: list,
      }

      return response.ok(result)
    } catch (error) {
      const result: Result<{}, RequestError> = {
        success: false,
        error: { message: error.message },
      }

      return response.internalServerError(result)
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
    return inertia.render('reading_lists/show', { list })
  }

  // Adiciona um livro à lista
  async addBook({ request, params, auth, response }: HttpContext) {
    const bookId = request.input('book_id')
    await this.readingListService.addBook(params.id, auth.user!.id, bookId)
    return response.noContent()
  }

  // Remove um livro da lista
  async removeBook({ request, params, auth, response }: HttpContext) {
    const bookId = request.input('book_id')
    await this.readingListService.removeBook(params.id, auth.user!.id, bookId)
    return response.noContent()
  }
}
