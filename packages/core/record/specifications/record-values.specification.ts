import { CompositeSpecification } from '@egodb/domain'
import type { Result } from 'oxide.ts'
import { Ok } from 'oxide.ts'
import type { ICreateFieldsSchema_internal } from '../../field'
import type { Record } from '../record'
import { RecordValues } from '../value-objects'
import type { IRecordVisitor } from './interface'

export class WithRecordValues extends CompositeSpecification<Record, IRecordVisitor> {
  constructor(public readonly values: RecordValues) {
    super()
  }

  static fromArray(values: ICreateFieldsSchema_internal): WithRecordValues {
    return new this(RecordValues.fromArray(values))
  }

  isSatisfiedBy(t: Record): boolean {
    return t.values.equals(this.values)
  }

  mutate(t: Record): Result<Record, string> {
    t.values = this.values
    return Ok(t)
  }

  accept(v: IRecordVisitor): Result<void, string> {
    v.values(this)
    return Ok(undefined)
  }
}