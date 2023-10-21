import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface ContactFormData {
  address: string | null  | undefined
  description: string | null | undefined
  phone: string | null | undefined
  email: string | null | undefined
  title: string | null | undefined
  workDays: string | null | undefined
}

const yupObject = {
  address: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
  description: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
    phone: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
    email: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
    title: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
    workDays: yup.string()
    .nullable()
    .max(255, getMaxLengthErrorMessage()),
}
// const yupObject = {
//   address: yup.string()
//     .required('Поле "Адрес" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
//   description: yup.string()
//     .required('Поле "Страна, город" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
//     phone: yup.string()
//     .required('Поле "Телефон" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
//     email: yup.string()
//     .required('Поле "Телефон" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
//     title: yup.string()
//     .required('Поле "Заголовок" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
//     workDays: yup.string()
//     .required('Поле "Рабочие дни" является обязательным')
//     .max(255, getMaxLengthErrorMessage()),
// }
type FormType = yup.ObjectSchema<ContactFormData, yup.AnyObject>

export const createContactScheme: FormType = yup.object().shape(yupObject)

export const updateContactScheme: FormType = createContactScheme
