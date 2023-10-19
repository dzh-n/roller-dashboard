import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { useGalleryStore } from '@modules/gallery/model/store'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  createGalleryScheme,
  GalleryFormData
} from '@modules/gallery/model/GalleryFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { GalleryForm } from '@modules/gallery/ui/GalleryForm'
import { LoadingButton } from '@mui/lab'
import { postFetcherJSON } from '@shared/api/fetcher/postFetcherJSON'
import { IGalleryCategory } from '@modules/galleryCategory/model/IGalleryCategory'
import { useState } from 'react'

interface Props {
  galleryCategories: IGalleryCategory[]
}

function CreateGallery({galleryCategories}: Props) {
  const {trigger, isMutating} = useSWRMutation('/gallery/', postFetcher)
  const [handleCreateClose] = useGalleryStore(({handleCreateClose}) => [handleCreateClose])
  const [image, setImage] = useState<File[]>([])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<GalleryFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createGalleryScheme)
  })

  const onSubmit: SubmitHandler<GalleryFormData> = async (data) => {
    try {
      const response = await trigger({...data, img: image[0]})
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

export { CreateGallery }
