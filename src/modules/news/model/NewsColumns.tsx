import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { INews } from '@modules/news/model/INews'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: INews): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function NewsColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<INews>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {
        field: 'image',
        headerName: 'Изображение', 
        width: 100,
        renderCell: ({row: {image}}) => (
          <Avatar
            src={image}
            alt=""
          />
        )
      },
      {field: 'title', headerName: 'Заголовок', flex: 1},
    {field: 'text', headerName: 'Текст', flex: 1},
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: ({row}) => [
        <GridActionsCellItem
          title="Изменить"
          label="Изменить"
          icon={<EditIcon sx={{fontSize: 24}}/>}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />,
        <GridActionsCellItem
          label="Удалить"
          title="Удалить"
          icon={<DeleteIcon sx={{fontSize: 24}}/>}
          onClick={async () => {
            try {
              await trigger(row.id)
              await mutate()
              toast.success('Успешно удалена')
            } catch (e) {
              const error = e as AxiosError<{ message: string }>
              toast.error(error.response?.data.message || 'Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
