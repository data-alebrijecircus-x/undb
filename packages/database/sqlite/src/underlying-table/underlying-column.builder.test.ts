import { BoolField, DateField, DateRangeField, NumberField, SelectField, StringField } from '@egodb/core'
import { Knex } from '@mikro-orm/better-sqlite'
import { UnderlyingColumnBuilder } from './underlying-column.builder.js'

describe('UnderlyingColumnBuilder', () => {
  const tableName = 'tableName'
  let knex: Knex
  beforeAll(() => {
    // @ts-expect-error
    knex = global.knex
  })

  test('should create auto increment column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createAutoIncrement()
    })

    expect(sb.toQuery()).toMatchInlineSnapshot(
      '"create table `tableName` (`auto_increment` integer not null primary key autoincrement)"',
    )
  })

  test('should create id column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createId()
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`id` varchar(255) not null)"')
  })

  test('should create created_at column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createCreatedAt()
    })

    expect(sb.toQuery()).toMatchInlineSnapshot(
      '"create table `tableName` (`created_at` datetime not null default CURRENT_TIMESTAMP)"',
    )
  })

  test('should create updated_at column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUpdatedAt()
    })

    expect(sb.toQuery()).toMatchInlineSnapshot(
      '"create table `tableName` (`updated_at` datetime not null default CURRENT_TIMESTAMP)"',
    )
  })

  test('should create string column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([StringField.create({ id: 'fldid', name: 'name' })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`fldid` varchar(255))"')
  })

  test('should create number column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([NumberField.create({ id: 'fldid', name: 'name' })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`fldid` float)"')
  })

  test('should create bool column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([BoolField.create({ id: 'fldid', name: 'name' })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`fldid` boolean)"')
  })

  test('should create date column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([DateField.create({ id: 'fldid', name: 'name' })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`fldid` datetime)"')
  })

  test('should create date range column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([DateRangeField.create({ id: 'fldid', name: 'name' })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot(
      '"create table `tableName` (`fldid_from` datetime, `fldid_to` datetime)"',
    )
  })

  test('should create select column', () => {
    const sb = knex.schema
    sb.createTable(tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(knex, tb, tableName)
      builder.createUnderlying([SelectField.create({ id: 'fldid', name: 'name', options: [] })])
    })

    expect(sb.toQuery()).toMatchInlineSnapshot('"create table `tableName` (`fldid` varchar(255))"')
  })
})
