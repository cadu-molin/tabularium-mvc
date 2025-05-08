import Publisher from '#models/publisher'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Publisher.createMany([
      {
        name: 'Penguin Random House',
      },
      {
        name: 'HarperCollins',
      },
      {
        name: 'Simon & Schuster',
      },
      {
        name: 'Hachette Book Group',
      },
      {
        name: 'Macmillan Publishers',
      },
      {
        name: 'Scholastic Corporation',
      },
      {
        name: 'Wiley',
      },
      {
        name: 'Springer Nature',
      },
    ])
  }
}
