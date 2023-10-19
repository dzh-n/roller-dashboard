import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control, FieldErrors } from 'react-hook-form'
import { ContactFormData } from '@modules/contact/model/ContactFormData'

interface Props {
  control: Control<ContactFormData>
  errors: FieldErrors<ContactFormData>
}

function ContactForm({control, errors}: Props) {
  return (<>
    <TextFieldCustom
      name="address"
      control={control}
      label="Адрес"
      errorMessage={errors.address?.message}
      required
    />
    <TextFieldCustom
      name="description"
      control={control}
      label="Страна, город"
      errorMessage={errors.description?.message}
      required
    />
    <TextFieldCustom
      name="phone"
      control={control}
      label="Телефон"
      errorMessage={errors.phone?.message}
      required
    />
    <TextFieldCustom
      name="title"
      control={control}
      label="Заголовок"
      errorMessage={errors.title?.message}
      required
    />
    <TextFieldCustom
      name="workDays"
      control={control}
      label="Рабочие дни"
      errorMessage={errors.workDays?.message}
      required
    />
  </>)
}

export { ContactForm }
