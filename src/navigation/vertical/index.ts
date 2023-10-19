// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Галерея',
      path: '/gallery',
      icon: 'ion:images-outline',
      children: [
        {
          title: 'Все изображении',
          path: '/gallery'
        },
        {
          title: 'Категории',
          path: '/gallery/categories'
        }
      ]
    },
    { title: 'Новости', path: '/news', icon: 'iconamoon:news-thin' },
    { title: 'Контакты', path: '/contact', icon: 'cil:contact' }
  ]
}

export default navigation
