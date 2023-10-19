import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import { useContactStore } from '@modules/contact/model/store'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  createContactScheme,
  ContactFormData
} from '@modules/contact/model/ContactFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { ContactForm } from '@modules/contact/ui/ContactForm'
import { LoadingButton } from '@mui/lab'
import { postFetcherJSON } from '@shared/api/fetcher/postFetcherJSON'

function CreateContact() {
  const {trigger, isMutating} = useSWRMutation('/contacts/', postFetcherJSON)
  const [handleCreateClose] = useContactStore(({handleCreateClose}) => [handleCreateClose])
  const {
    control,
    formState: {errors},
    handleSubmit,
    setError,
    setValue,
  } = useForm<ContactFormData>({
    mode: 'onBlur',
    resolver: yupResolver(createContactScheme)
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
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
        <ContactForm
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

export { CreateContact }
