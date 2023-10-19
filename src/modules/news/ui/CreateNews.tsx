import useSWRMutation from 'swr/mutation'
import { useNewsStore } from '@modules/news/model/store'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  createNewsScheme,
  NewsFormData
} from '@modules/news/model/NewsFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { NewsForm } from '@modules/news/ui/NewsForm'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { postFetcher } from '@shared/api/fetcher/postFetcher'

function CreateNews() {
  const {trigger, isMutating} = useSWRMutation('/news/', postFetcher)
  const [handleCreateClose] = useNewsStore(({handleCreateClose}) => [handleCreateClose])
  const [image, setImage] = useState<File[]>([])

  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<NewsFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createNewsScheme)
  })

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    // try {
    //   const response = await trigger(data)
    //   handleCreateClose()
    //   toast.success('Успешно создано')
    // } catch (e) {
    //   toast.error('Произошла ошибка')
    // }
    try {
      const response = await trigger({...data, image: image[0]})
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
        <NewsForm
        image={image}
        setImage={setImage}
        setValue={setValue}
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

export { CreateNews }
