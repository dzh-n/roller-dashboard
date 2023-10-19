import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface NewsFormData {
  img: any
  title: string
  text: string
  date: string
}

const yupObject = {
  img: yup.string()
    .required('Выберите изображения')
    .max(255, getMaxLengthErrorMessage()),
  title: yup.string()
    .required('Поле "Название" является обязательным')
    .max(255, getMaxLengthErrorMessage()),
  text: yup.string()
    .required('Введите описание новости'),
  date: yup.string()
    .required('Введите дату')
}

type FormType = yup.ObjectSchema<NewsFormData, yup.AnyObject>

export const createNewsScheme: FormType = yup.object().shape(yupObject)

export const updateNewsScheme: FormType = yup.object().shape({
  ...yupObject,
  img: yup.string().nullable()
})
