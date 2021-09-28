import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { createWrapper } from 'next-redux-wrapper'
import reducer from './rootReducer'

// create a makeStore function
const makeStore = (): any => createStore(reducer, applyMiddleware(thunk))

// export an assembled wrapper
export const wrapper = createWrapper(makeStore)

export default makeStore
