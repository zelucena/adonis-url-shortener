'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateDatabaseSchema extends Schema {
  async up() {
    await this.raw(`
      create table if not exists url(
        id serial,
        long varchar(2048),
        short varchar(10),
        primary key(id)
      )
    `);
  }

  async down() {
    await this.raw(`drop table if exists url`);
  }
}

module.exports = CreateDatabaseSchema
