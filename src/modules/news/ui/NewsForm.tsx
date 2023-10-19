import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { NewsFormData } from '@modules/news/model/NewsFormData'
import { INews } from '../model/INews'
import { Dispatch, SetStateAction } from 'react'
import { FileUploader } from '@shared/ui/FileUploader'

interface Props {
  image: File[]
  setImage: Dispatch<SetStateAction<File[]>>
  setValue: UseFormSetValue<NewsFormData>
  control: Control<NewsFormData>
  errors: FieldErrors<NewsFormData>
}

function NewsForm({ control, errors, image, setImage, setValue }: Props) {
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
      <TextFieldCustom 
        name='title' 
        control={control} 
        label='Заголовок' 
        errorMessage={errors.title?.message}
        required
      />
      <TextFieldCustom
        name='text'
        control={control}
        label='Текст'
        errorMessage={errors.text?.message}
        required
        textFieldProps={() => ({
          rows: 4,
          multiline: true
        })}
      />
      <TextFieldCustom
        name='date'
        control={control}
        label='Дата'
        errorMessage={errors.date?.message}
        required
      />
    </>
  )
}

export { NewsForm }
