import axios, { AxiosResponse, CancelToken } from 'axios';
import { API_URL, DEFI_URL } from './config';

export interface IRelationshipPath {
  targetEntity: {
    relationship: {
      inverse: boolean;
      type: string;
    },
    targetEntity: {
      name: string,
      type: string
    }
  }
}

export interface IProtocol {
  entity: {
    type: string,
    name: string,
    properties: {
      url: string,
      description: string,
      category: string,
    }
  },
  summaryText: string,
  summaryImages: string[]
}

export interface IProtocolsResult {
  result: IProtocol[]
}

const apiRequest = axios.create({
  baseURL: API_URL,
  headers: {
    'UTU-Trust-Api-Client-Id': 'defiPortal'
  }
});

const defiRequest = axios.create({
  baseURL: DEFI_URL
});

export const getSortedProviders = async (address: string, cancelToken: CancelToken, callSubscribe?: boolean): Promise<AxiosResponse<IProtocolsResult>> => {

  const sourceCriteria = encodeURIComponent(JSON.stringify({
    "type": "Address",
    "ids": { address: address.toLowerCase() }
  }));

  if (callSubscribe) {
    await defiRequest.post(`subscribe/${address}`, undefined, { cancelToken });
  }

  const response = await apiRequest.get(
    `${API_URL}/ranking?sourceCriteria=${sourceCriteria}&targetType=DeFiProtocol`,
    { cancelToken }
  );

  return response;
};

