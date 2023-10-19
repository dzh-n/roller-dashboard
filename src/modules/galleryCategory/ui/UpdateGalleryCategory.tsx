import { KeyedMutator } from 'swr'
import { useGalleryCategoryStore } from '@modules/galleryCategory/model/store'
import useSWRMutation from 'swr/mutation'
import { updateFetcherJSON } from '@shared/api/fetcher/updateFetcherJSON'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  GalleryCategoryFormData,
  updateGalleryCategoryScheme
} from '@modules/galleryCategory/model/GalleryCategoryFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { GalleryCategoryForm } from '@modules/galleryCategory/ui/GalleryCategoryForm'
import { LoadingButton } from '@mui/lab'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateGalleryCategory({mutate}: Props) {
  const [galleryCategory, handleUpdateClose] = useGalleryCategoryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/category_gallery', galleryCategory?.id], updateFetcherJSON)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<GalleryCategoryFormData>({
    defaultValues: {
      name: galleryCategory?.name,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateGalleryCategoryScheme)
  })

  const onSubmit: SubmitHandler<GalleryCategoryFormData> = async (data) => {
    try {
      await trigger(data)
      await mutate()
      handleUpdateClose()
      toast.success('Успешно изменено')
    } catch (e) {
      toast.error('Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить"
      handleClose={handleUpdateClose}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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

export { UpdateGalleryCategory }
