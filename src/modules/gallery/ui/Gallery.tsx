import CustomCard from '@shared/ui/CustomCard'
import CustomPageHeader from '@shared/ui/CustomPageHeader'
import { useGalleryStore } from '@modules/gallery/model/store'
import useSWR from 'swr'
import { IGallery } from '@modules/gallery/model/IGallery'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import Error500 from '../../../pages/500'
import { DataGrid } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { GalleryColumns } from '@modules/gallery/model/GalleryColumns'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import useSWRMutation from 'swr/mutation'
import { CreateGallery } from '@modules/gallery/ui/CreateGallery'
import { UpdateGallery } from '@modules/gallery/ui/UpdateGallery'
import { IGalleryCategory } from '@modules/galleryCategory/model/IGalleryCategory'
import Loader from '@shared/ui/Loader'

function Gallery() {
  const [open, update, handleCreateOpen, handleUpdateOpen] = useGalleryStore(
    ({ open, update, handleCreateOpen, handleUpdateOpen }) => [open, update, handleCreateOpen, handleUpdateOpen]
  )
  const { trigger } = useSWRMutation('/gallery', deleteFetcher)
  const {
    data: gallery,
    isLoading,
    isValidating,
    mutate,
    error
  } = useSWR<IGallery[]>('/gallery/', getFetcher)
  const {
    data: galleryCategories
  } = useSWR<IGalleryCategory[]>('/category_gallery/', getFetcher)

  if (!galleryCategories) {
    return <Loader/>
  }

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard>
      {open && <CreateGallery galleryCategories={galleryCategories} />}
      {update && <UpdateGallery galleryCategories={galleryCategories} mutate={mutate} />}
      <CustomPageHeader handleOpen={handleCreateOpen} title='Все изображения' buttonName='Создать' />
      <DataGrid
        slots={{ loadingOverlay: LinearProgress }}
        hideFooter
        loading={isLoading || isValidating}
        columns={GalleryColumns({ handleUpdateOpen, trigger, mutate })}
        rows={gallery || []}
        rowSelection={false}
        autoHeight
        localeText={{
          noRowsLabel: 'Пусто'
        }}
      />
    </CustomCard>
  )
}

export { Gallery }
