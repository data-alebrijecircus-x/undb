'use client'

import type { Table as CoreTable } from '@egodb/core'
import { Box } from '@egodb/ui'
import { useEgoUITheme } from '@egodb/ui'
import { Stack } from '@egodb/ui'
import { CreateRecordFormDrawer } from '../../../components/create-record-form/create-record-form-drawer'
import { EditRecordFormDrawer } from '../../../components/edit-record-form/edit-record-form-drawer'
import { RecordSelectionDialog } from '../../../components/record-selection/record-selection-dialog'
import { TableHaeder } from '../../../components/table/table-header'
import { TableToolbar } from '../../../components/table/table-toolbar'
import { ViewDisplay } from '../../../components/table/view-display'

interface IProps {
  table: CoreTable
}

export default function Table({ table }: IProps) {
  const theme = useEgoUITheme()

  return (
    <Stack h="100vh" spacing={0}>
      <TableHaeder table={table} />
      <TableToolbar table={table} />
      <Box w="100%" h="100%" bg={theme.white} sx={{ overflow: 'scroll', flex: '1 1 auto' }}>
        <ViewDisplay table={table} />
      </Box>

      <CreateRecordFormDrawer table={table} />
      <EditRecordFormDrawer table={table} />

      <RecordSelectionDialog table={table} />
    </Stack>
  )
}
