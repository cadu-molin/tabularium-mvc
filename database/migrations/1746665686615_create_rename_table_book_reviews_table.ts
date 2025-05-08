import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableNameOld = 'book_reviews'
  protected tableNameNew = 'book_review'

  async up() {
    this.schema.renameTable(this.tableNameOld, this.tableNameNew)
  }

  async down() {
    this.schema.renameTable(this.tableNameNew, this.tableNameOld)
  }
}
