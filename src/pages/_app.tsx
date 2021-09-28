import { ReactElement } from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import store from '../store/store'
function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(metric)
}

export default MyApp
