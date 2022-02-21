import axios, { AxiosResponse, CancelToken } from 'axios'
import { CORE_API_URL, DEFI_URL } from '../Config'
import { getUTUApiAccessToken } from '../redux/actions/wallet.actions'
export interface IRelationshipPath {
  targetEntity: {
    relationship: {
      inverse: boolean
      type: string
    }
    targetEntity: {
      name: string
      type: string
    }
  }
}

export interface IProtocol {
  entity: {
    type: string
    name: string
    properties: {
      url: string
      description: string
      category: string
    }
  }
  summaryText: string
  summaryImages: string[]
}

export interface IProtocolsResult {
  result: IProtocol[]
}

const apiRequest = axios.create({
  baseURL: CORE_API_URL,
  headers: {
    'UTU-Trust-Api-Client-Id': 'defiPortal',
  },
})

apiRequest.interceptors.request.use(
  async (config) => {
    const utu_api_token = await getUTUApiAccessToken()
    config.headers = {
      Authorization: `Bearer ${utu_api_token}`,
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

const defiRequest = axios.create({
  baseURL: DEFI_URL,
})

export const getSortedProviders = async (
  address: string,
  cancelToken: CancelToken,
  callSubscribe?: boolean
): Promise<AxiosResponse<IProtocolsResult>> => {
  const addressConverted = String(address).toLowerCase()
  const sourceCriteria = encodeURIComponent(
    JSON.stringify({
      type: 'Address',
      ids: { address: addressConverted },
    })
  )

  if (callSubscribe) {
    await defiRequest.post(`subscribe/${addressConverted}`, undefined, {
      cancelToken,
    })
  }

  const response = await apiRequest.get(
    `${CORE_API_URL}/ranking?sourceCriteria=${sourceCriteria}&targetType=DeFiProtocol`,
    { cancelToken }
  )

  return response
}

export { apiRequest }
