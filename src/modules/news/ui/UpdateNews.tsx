import { KeyedMutator } from 'swr'
import { useNewsStore } from '@modules/news/model/store'
import useSWRMutation from 'swr/mutation'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  NewsFormData,
  updateNewsScheme
} from '@modules/news/model/NewsFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { NewsForm } from '@modules/news/ui/NewsForm'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateNews({mutate}: Props) {
  const [image, setImage] = useState<File[]>([])
  const [news, handleUpdateClose] = useNewsStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/news', news?.id], updateFetcher)
  const {
    control,
    formState: {errors},
    handleSubmit,
    setValue,
  } = useForm<NewsFormData>({
    defaultValues: {
      title: news?.title,
      date:news?.date,
      text: news?.text,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateNewsScheme)
  })

  const onSubmit: SubmitHandler<NewsFormData> = async (data) => {
    try {
      const response = await trigger({...data, image: image[0]})
      await mutate()
      handleUpdateClose()
      toast.success('Успешно создано')
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

export { UpdateNews }
