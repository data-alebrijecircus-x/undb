/* eslint-disable @typescript-eslint/no-empty-function */
import type { EntityManager, Knex } from '@mikro-orm/better-sqlite'
import type {
  ITableSpecVisitor,
  WithDuplicatedField,
  WithRatingMax,
  WithTableSchema,
  WithoutField,
  WithoutOption,
} from '@undb/core'
import { WithNewField, isSelectFieldType } from '@undb/core'
import { RecordSqliteDuplicateValueVisitor } from '../repository/record/record-sqlite-duplicate-value.visitor.js'
import { UnderlyingColumnBuilder } from './underlying-column.builder.js'
import { UnderlyingTempDuplicateOptionTable } from './underlying-temp-duplicate-option-table.js'

export class UnderlyingTableSqliteManagerVisitor implements ITableSpecVisitor {
  private readonly knex: Knex
  private sb?: Knex.SchemaBuilder
  private qb?: Knex.QueryBuilder
  #queries: string[] = []
  constructor(private readonly tableName: string, private readonly em: EntityManager) {
    const knex = em.getKnex()
    this.knex = knex
  }
  withoutWidge(): void {}
  withChartAggregate(): void {}
  withNumberAggregate(): void {}
  withVirsualizationName(): void {}
  withWidgesLayout(): void {}
  get #sb() {
    return this.sb ?? this.knex.schema
  }

  get #qb() {
    return this.qb ?? this.knex.queryBuilder()
  }

  public get queries(): string[] {
    return [this.sb?.toQuery() ?? '', this.qb?.toQuery() ?? '', ...this.#queries].filter(Boolean)
  }

  async commit() {
    for (const query of this.queries) {
      await this.em.execute(query)
    }
  }

  idEqual(): void {
    throw new Error('Method not implemented.')
  }
  nameEqual(): void {}
  emojiEqual(): void {}
  schemaEqual(s: WithTableSchema): void {
    this.sb = this.#sb.alterTable(this.tableName, (tb) => {
      const builder = new UnderlyingColumnBuilder(this.em, this.knex, tb, this.tableName)
      builder.createUnderlying(s.schema.nonSystemFields)
      this.#queries.push(...builder.queries)
    })
  }
  viewsEqual(): void {}
  viewEqual(): void {}
  viewNameEqual(): void {}
  newView(): void {}
  withoutView(): void {}
  viewsOrderEqual(): void {}
  filterEqual(): void {}
  ratingMaxEqual(s: WithRatingMax): void {
    this.qb = this.#qb.update(s.field.id.value, s.max).where(s.field.id.value, '>', s.max).from(this.tableName)
  }
  currencySymbolEqual(): void {}
  rowHeightEqual(): void {}
  newField(s: WithNewField): void {
    const field = s.field
    if (field.isSystem()) {
      return
    }

    const query = this.#sb
      .alterTable(this.tableName, (tb) => {
        const builder = new UnderlyingColumnBuilder(this.em, this.knex, tb, this.tableName)
        builder.createUnderlying([field])
        this.#queries.push(...builder.queries)
      })
      .toQuery()

    const queries = query.split(';\n')

    this.#queries.push(...queries)
  }
  withDuplicatedField(s: WithDuplicatedField): void {
    const spec = new WithNewField(s.field)
    this.newField(spec)

    if (s.includesValues) {
      if (isSelectFieldType(s.field) && isSelectFieldType(s.from)) {
        const table = new UnderlyingTempDuplicateOptionTable(this.tableName, s.from, s.field, this.knex)
        this.#queries.push(...table.create())
      }

      const knex = this.em.getKnex()
      const visitor = new RecordSqliteDuplicateValueVisitor(this.tableName, s.from, this.em, knex.queryBuilder(), knex)

      s.field.accept(visitor)
      this.#queries.push(...visitor.queries)

      if (isSelectFieldType(s.field) && isSelectFieldType(s.from)) {
        const table = new UnderlyingTempDuplicateOptionTable(this.tableName, s.from, s.field, this.knex)
        this.#queries.push(table.drop())
      }
    }
  }
  fieldsOrder(): void {}
  fieldWidthEqual(): void {}
  fieldVisibility(): void {}
  displayTypeEqual(): void {}
  kanbanFieldEqual(): void {}
  treeViewFieldEqual(): void {}
  calendarFieldEqual(): void {}
  optionsEqual(): void {}
  newOption(): void {}
  optionEqual(): void {}
  sortsEqual(): void {}
  pinnedFields(): void {}

  witoutOption(s: WithoutOption): void {
    this.qb = this.#qb.from(this.tableName).where(s.field.id.value, s.optionKey.value).update(s.field.id.value, null)
  }
  withoutField(s: WithoutField): void {
    // const fields = UnderlyingColumnFactory.createMany([s.field], this.tableName)
    // const sqls = fields.map(
    //   (f) =>
    //     `
    // alter table \`${this.tableName}\` drop column \`${f.name}\`;
    // `,
    // )
    // this.#queries.push(...sqls)
  }
  fieldOptionsEqual(): void {}
  withFieldName(): void {}
  withFieldDescription(): void {}
  withFieldDisplay(): void {}
  displayFieldsEqual(): void {}
  withFormat(): void {}
  withTimeFormat(): void {}
  withShowSystemFields(): void {}
  withFieldRequirement(): void {}
  symmetricReferenceFieldEqual(): void {}
  withWidge(): void {}
  not(): this {
    return this
  }
}
