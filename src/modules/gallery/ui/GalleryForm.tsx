import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control, Controller, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { GalleryFormData } from '@modules/gallery/model/GalleryFormData'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { IGalleryCategory } from '@modules/galleryCategory/model/IGalleryCategory'
import { FileUploader } from '@shared/ui/FileUploader'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  control: Control<GalleryFormData>
  errors: FieldErrors<GalleryFormData>
  galleryCategories: IGalleryCategory[]
  image: File[]
  setImage: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<GalleryFormData>
}

function GalleryForm({ control, errors, galleryCategories, image, setImage, setValue }: Props) {
  return (
    <>
      <FileUploader 
        name='img'
        files={image}
        setFiles={setImage}
        setValue={setValue}
        control={control}
        title='Выберите изображение'
        errorMessage={errors.img?.message}
      />
      <ModalFormControl errorMessage={errors.category_id?.message}>
        <InputLabel id='select-category_id'>Категория *</InputLabel>
        <Controller
          name='category_id'
          control={control}
          render={({ field }) => (
            <Select
              labelId='select-category_id-label'
              id='select-category_id'
              label='Категория *'
              {...field}
              required
            >
              {galleryCategories.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </ModalFormControl>
    </>
  )
}

export { GalleryForm }
