import Author from '#models/author'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Author.createMany([
      {
        name: 'Johann Wolfgang von Goethe',
      },
      {
        name: 'Friedrich Nietzsche',
      },
      {
        name: 'J.R.R. Tolkien',
      },
      {
        name: 'Agatha Christie',
      },
      {
        name: 'Stephen King',
      },
      {
        name: 'Isaac Asimov',
      },
      {
        name: 'Arthur C. Clarke',
      },
      {
        name: 'Ray Bradbury',
      },
    ])
  }
}
