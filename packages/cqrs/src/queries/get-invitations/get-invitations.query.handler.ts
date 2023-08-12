import type { IQueryHandler } from '@undb/domain'
import { WithInvitationStatus, type IInvitationQueryModel } from '@undb/integrations'
import { Some } from 'oxide.ts'
import type { IGetInvitationsOutput } from './get-invitations.query.interface.js'
import type { GetInvitationsQuery } from './get-invitations.query.js'

export class GetInvitationsQueryHandler implements IQueryHandler<GetInvitationsQuery, IGetInvitationsOutput> {
  constructor(protected readonly rm: IInvitationQueryModel) {}
  async execute(query: GetInvitationsQuery): Promise<IGetInvitationsOutput> {
    const invitations = await this.rm.find(Some(WithInvitationStatus.active()))

    return {
      invitations,
    }
  }
}
