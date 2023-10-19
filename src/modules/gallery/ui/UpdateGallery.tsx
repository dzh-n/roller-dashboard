import { KeyedMutator } from 'swr'
import { useGalleryStore } from '@modules/gallery/model/store'
import useSWRMutation from 'swr/mutation'
import { updateFetcherJSON } from '@shared/api/fetcher/updateFetcherJSON'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  GalleryFormData,
  updateGalleryScheme
} from '@modules/gallery/model/GalleryFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { GalleryForm } from '@modules/gallery/ui/GalleryForm'
import { LoadingButton } from '@mui/lab'
import { IGalleryCategory } from '@modules/galleryCategory/model/IGalleryCategory'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { useState } from 'react'

interface Props {
  mutate: KeyedMutator<any>
  galleryCategories: IGalleryCategory[]
}

function UpdateGallery({mutate, galleryCategories}: Props) {
  const [image, setImage] = useState<File[]>([])
  const [gallery, handleUpdateClose] = useGalleryStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/gallery', gallery?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<GalleryFormData>({
    defaultValues: {
      category_id: gallery?.category_gallery,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateGalleryScheme)
  })

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    try {
      await trigger({...data, img: image[0]})
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
        <GalleryForm
          errors={errors}
          control={control}
          galleryCategories={galleryCategories}
          image={image}
          setImage={setImage}
          setValue={setValue}
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

export { UpdateGallery }
