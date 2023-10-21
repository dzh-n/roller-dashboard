import { KeyedMutator } from 'swr'
import { useContactStore } from '@modules/contact/model/store'
import useSWRMutation from 'swr/mutation'
import { updateFetcherJSON } from '@shared/api/fetcher/updateFetcherJSON'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  ContactFormData,
  updateContactScheme
} from '@modules/contact/model/ContactFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { ContactForm } from '@modules/contact/ui/ContactForm'
import { LoadingButton } from '@mui/lab'

interface Props {
  mutate: KeyedMutator<any>
}

function UpdateContact({mutate}: Props) {
  const [contact, handleUpdateClose] = useContactStore(
    ({handleUpdateClose, update}) => [update, handleUpdateClose]
  )
  const {trigger, isMutating} = useSWRMutation(['/contacts', contact?.id], updateFetcherJSON)
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<ContactFormData>({
    defaultValues: {
      address: contact?.address,
      description: contact?.description,
      phone: contact?.phone,
      email: contact?.email,
      title: contact?.title,
      workDays: contact?.workDays,
    },
    mode: 'onBlur',
    resolver: yupResolver(updateContactScheme)
  })

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
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

export { UpdateContact }
