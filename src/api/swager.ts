import axios from 'axios'
import { SWAGGER_URL } from './config'

export const getSortedProviders = async (entityType: string): Promise<any> => {
  // headers
  const headers = { 'Content-Type': 'application/json' }

  return axios.get(`${SWAGGER_URL}/sortedEntities?entityType=${entityType}`, {
    headers: headers,
  })
}
