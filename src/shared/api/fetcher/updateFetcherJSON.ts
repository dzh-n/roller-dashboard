import { axiosInstance } from '@shared/api/axiosInstance'
import { getBearerToken } from '@shared/lib/getBearerToken'


export async function updateFetcherJSON(
  [url, id]: any,
  {arg: data}: { arg: any }
) {
  try {
    const formData: any = {
      '_method': 'PUT'
    }
    for (let key in data) {
      if (data[key] !== null && data[key] !== undefined) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value: string) => (
            formData[`${key}[]`] = value
          ))
        } else {
          formData[key] = data[key]
        }
      }
    }
    const response = await axiosInstance.put(`${url}/${id}`, formData, {
      headers: {
        Authorization: getBearerToken()
      },
    })
    return response.data
  } catch (e) {
    throw e
  }
}
