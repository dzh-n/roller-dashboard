import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  createGalleryCategoryScheme,
  GalleryCategoryFormData
} from '@modules/galleryCategory/model/GalleryCategoryFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { GalleryCategoryForm } from '@modules/galleryCategory/ui/GalleryCategoryForm'
import { LoadingButton } from '@mui/lab'
import { postFetcherJSON } from '@shared/api/fetcher/postFetcherJSON'

function CreateGalleryCategory() {
  const {trigger, isMutating} = useSWRMutation('/category_gallery/', postFetcherJSON)
  const [handleCreateClose] = useGalleryCategoryStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<GalleryCategoryFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createGalleryCategoryScheme)
  })

  const onSubmit: SubmitHandler<GalleryCategoryFormData> = async (data) => {
    try {
      const response = await trigger(data)
      handleCreateClose()
      toast.success('Успешно создано')
    } catch (e) {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Создать"
      handleClose={handleCreateClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <GalleryCategoryForm
          errors={errors}
          control={control}
        />
        <LoadingButton
          loading={isMutating}
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          sx={{mt: 5}}
        >
          Отправить
        </LoadingButton>
      </form>
    </CustomDialog>
  )
}

export { CreateGalleryCategory }
