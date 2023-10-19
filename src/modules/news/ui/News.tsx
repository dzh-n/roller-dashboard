import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useNewsStore } from '@modules/news/model/store'
import useSWR from 'swr'
import { INews } from '@modules/news/model/INews'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { NewsColumns } from '@modules/news/model/NewsColumns'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import useSWRMutation from 'swr/mutation'
import { CreateNews } from '@modules/news/ui/CreateNews'
import { UpdateNews } from '@modules/news/ui/UpdateNews'
import { useState } from 'react'

function News() {
  const [open, update, handleCreateOpen, handleUpdateOpen] = useNewsStore(
    ({ open, update, handleCreateOpen, handleUpdateOpen }) => [open, update, handleCreateOpen, handleUpdateOpen]
  )
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  })
  const { trigger } = useSWRMutation('/news', deleteFetcher)
  const {
    data: news,
    isLoading,
    isValidating,
    mutate,
    error
  } = useSWR<{data: {ns: INews[], count: number}}>(`/news/?page=${paginationModel.page + 1}`, getFetcher)

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      {open && <CreateNews />}
      {update && <UpdateNews mutate={mutate} />}
      <CustomPageHeader handleOpen={handleCreateOpen} title='Новости' buttonName='Создать' />
      <DataGrid
        slots={{ loadingOverlay: LinearProgress }}
        loading={isLoading || isValidating}
        columns={NewsColumns({ handleUpdateOpen, trigger, mutate })}
        rows={news?.data.ns || []}
        rowSelection={false}
        pagination
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={async (model) => {
          setPaginationModel(model)
          await mutate(news, {
            revalidate: true,
          })
        }}
        rowCount={(news?.data?.count || 1) * paginationModel.pageSize}
        autoHeight
        localeText={{
          noRowsLabel: 'Пусто'
        }}
      />
    </CustomCard>
  )
}

export { News }
