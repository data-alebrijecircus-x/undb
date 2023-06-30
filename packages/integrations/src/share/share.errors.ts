import { ExceptionBase } from '@undb/domain'

export class NotFoundShare extends ExceptionBase {
  code = 'SHARE.NOT_FOUND'

  constructor() {
    super('Share not found')
  }
}
