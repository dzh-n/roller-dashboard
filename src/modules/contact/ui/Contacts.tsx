import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useContactStore } from '@modules/contact/model/store'
import useSWR from 'swr'
import { IContact } from '@modules/contact/model/IContact'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { ContactColumns } from '@modules/contact/model/ContactColumns'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import useSWRMutation from 'swr/mutation'
import { CreateContact } from '@modules/contact/ui/CreateContact'
import { UpdateContact } from '@modules/contact/ui/UpdateContact'

function Contacts() {
  const [open, update, handleCreateOpen, handleUpdateOpen] = useContactStore(
    ({ open, update, handleCreateOpen, handleUpdateOpen }) => [open, update, handleCreateOpen, handleUpdateOpen]
  )
  const { trigger } = useSWRMutation('/contacts', deleteFetcher)
  const {
    data: contact,
    isLoading,
    isValidating,
    mutate,
    error
  } = useSWR<IContact[]>('/contacts/', getFetcher)

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      {open && <CreateContact />}
      {update && <UpdateContact mutate={mutate} />}
      <CustomPageHeader handleOpen={handleCreateOpen} title='Контакты' buttonName='Создать' />
      <DataGrid
        slots={{ loadingOverlay: LinearProgress }}
        hideFooter
        loading={isLoading || isValidating}
        columns={ContactColumns({ handleUpdateOpen, trigger, mutate })}
        rows={contact || []}
        rowSelection={false}
        autoHeight
        localeText={{
          noRowsLabel: 'Пусто'
        }}
      />
    </CustomCard>
  )
}

export { Contacts }
