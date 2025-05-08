import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const bookDomCasmuro = await Book.firstOrCreate({
      title: 'Dom Casmurro',
    })

    const bookMemoriasPostumas = await Book.firstOrCreate({
      title: 'Memórias Póstumas de Brás Cubas',
    })

    await bookDomCasmuro.related('authors').attach([1])
    await bookMemoriasPostumas.related('authors').attach([2])
  }
}
