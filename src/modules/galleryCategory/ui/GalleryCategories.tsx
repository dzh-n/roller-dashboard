import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import useSWR from 'swr'
import { IGalleryCategory } from '@modules/galleryCategory/model/IGalleryCategory'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { galleryCategoryColumns } from '@modules/galleryCategory/model/galleryCategoryColumns'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import useSWRMutation from 'swr/mutation'
import { CreateGalleryCategory } from '@modules/galleryCategory/ui/CreateGalleryCategory'
import { UpdateGalleryCategory } from '@modules/galleryCategory/ui/UpdateGalleryCategory'

function GalleryCategories() {
  const [open, update, handleCreateOpen, handleUpdateOpen] = useGalleryCategoryStore(
    ({ open, update, handleCreateOpen, handleUpdateOpen }) => [open, update, handleCreateOpen, handleUpdateOpen]
  )
  const { trigger } = useSWRMutation('/category_gallery', deleteFetcher)
  const {
    data: galleryCategories,
    isLoading,
    isValidating,
    mutate,
    error
  } = useSWR<IGalleryCategory[]>('/category_gallery/', getFetcher)

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      {open && <CreateGalleryCategory />}
      {update && <UpdateGalleryCategory mutate={mutate} />}
      <CustomPageHeader handleOpen={handleCreateOpen} title='Категории галереи' buttonName='Создать' />
      <DataGrid
        slots={{ loadingOverlay: LinearProgress }}
        hideFooter
        loading={isLoading || isValidating}
        columns={galleryCategoryColumns({ handleUpdateOpen, trigger, mutate })}
        rows={galleryCategories || []}
        rowSelection={false}
        autoHeight
        localeText={{
          noRowsLabel: 'Пусто'
        }}
      />
    </CustomCard>
  )
}

export { GalleryCategories }
