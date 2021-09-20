import { ReactElement } from 'react'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  // eslint-disable-next-line no-console
  console.log(metric)
}

export default MyApp
