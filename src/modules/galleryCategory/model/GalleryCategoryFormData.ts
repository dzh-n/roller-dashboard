import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface GalleryCategoryFormData {
  name: string
}

const yupObject = {
  name: yup.string()
    .required('Поле "Название" является обязательным')
    .max(255, getMaxLengthErrorMessage()),
}

type FormType = yup.ObjectSchema<GalleryCategoryFormData, yup.AnyObject>

export const createGalleryCategoryScheme: FormType = yup.object().shape(yupObject)

export const updateGalleryCategoryScheme: FormType = createGalleryCategoryScheme
