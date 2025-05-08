import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        login: 'admin',
        password: 'admin',
        fullName: 'Admin',
      },
      {
        login: 'nelson.rodrigos',
        password: '1123',
        fullName: 'Nelson Rodrigues',
      },
    ])
  }
}
