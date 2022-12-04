import { CompositeSpecification } from '@egodb/domain'
import type { Result } from 'oxide.ts'
import { Ok } from 'oxide.ts'
import type { Record } from '../record'
import { RecordId } from '../value-objects'
import type { IRecordSpecVisitor } from './interface'

export class WithRecordId extends CompositeSpecification {
  constructor(public readonly id: RecordId) {
    super()
  }

  isSatisfiedBy(t: Record): boolean {
    return this.id.equals(t.id)
  }

  mutate(t: Record): Result<Record, string> {
    t.id = this.id
    return Ok(t)
  }

  accept(v: IRecordSpecVisitor): Result<void, string> {
    v.idEqual(this)
    return Ok(undefined)
  }
}

export const WithRecordIdS = (id: string) => new WithRecordId(RecordId.from(id))