export const API_BASE_URL = process.env.REACT_APP_UTU_API_BASE_URL
export const CORE_API_URL = process.env.REACT_APP_UTU_API_BASE_URL + '/core-api'
export const DEFI_URL = process.env.REACT_APP_UTU_DEFI_URL
export const CHAIN_ID = Number(process.env.REACT_APP_CHAIN_ID || 80001)
export const INFURA_ID = process.env.REACT_APP_INFURA_ID
export const ENDORSEMENT_NETWORK = process.env.REACT_APP_UTU_ENDORSEMENT_NETWORK || 'mumbai';
export const SDK_ENV = process.env.REACT_APP_UTU_SDK_ENV || 'staging'

export const EVENT_UTU_CONFIG = "utuConfig";