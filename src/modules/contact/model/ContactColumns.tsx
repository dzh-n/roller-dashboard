import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { IContact } from '@modules/contact/model/IContact'
import { KeyedMutator } from 'swr'

interface Props {
  handleUpdateOpen(data: IContact): void

  mutate: KeyedMutator<any>

  trigger(id: number): Promise<any>
}

export function ContactColumns({handleUpdateOpen, trigger, mutate}: Props): GridColDef<IContact>[] {
  return [
    {field: 'id', headerName: '#', width: 80},
    {field: 'address', headerName: 'Адрес', flex: 1},
    {field: 'description', headerName: 'Страна, город', flex: 1},
    {field: 'phone', headerName: 'Телефон', flex: 1},
    {field: 'title', headerName: 'Заголовок', flex: 1},
    {field: 'workDays', headerName: 'Рабочие дни', flex: 1},
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
              toast.success('Успешно удалено')
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
