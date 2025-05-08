import Book from '#models/book'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Book.createMany([
      {
        title: 'Dom Casmurro',
        edition: '1',
        releaseDate: DateTime.fromJSDate(new Date('1900-01-01')),
        publisherId: 1,
      },
      {
        title: 'Memórias Póstumas de Brás Cubas',
        edition: '1',
        releaseDate: DateTime.fromJSDate(new Date('1900-01-01')),
        publisherId: 1,
      },
    ])
  }
}
