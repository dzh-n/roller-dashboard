import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface GalleryFormData {
  img: any
  category_id: number
}

const yupObject = {
  img: yup.string()
    .required('Выберите изображения')
    .max(255, getMaxLengthErrorMessage()),
    category_id: yup.number()
    .required('Выберите категорию для изображения')
}

type FormType = yup.ObjectSchema<GalleryFormData, yup.AnyObject>

export const createGalleryScheme: FormType = yup.object().shape(yupObject)

export const updateGalleryScheme: FormType = yup.object().shape({
  ...yupObject,
  img: yup.string().nullable()
})
