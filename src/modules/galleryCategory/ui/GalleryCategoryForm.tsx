import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control, FieldErrors } from 'react-hook-form'
import { GalleryCategoryFormData } from '@modules/galleryCategory/model/GalleryCategoryFormData'

interface Props {
  control: Control<GalleryCategoryFormData>
  errors: FieldErrors<GalleryCategoryFormData>
}

function GalleryCategoryForm({control, errors}: Props) {
  return (
    <TextFieldCustom
      name="name"
      control={control}
      label="Название"
      errorMessage={errors.name?.message}
      required
    />
  )
}

export { GalleryCategoryForm }
