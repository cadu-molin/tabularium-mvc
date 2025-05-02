import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'book_reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('review').notNullable()
      table.integer('rating').notNullable()
      table.integer('book_id').unsigned().references('id').inTable('book').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('user').onDelete('CASCADE')
      table.unique(['book_id', 'user_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
