import React, { ReactElement } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Detail({ props }: any): ReactElement {
  // eslint-disable-next-line no-console
  console.log(props)
  return (
    <div className="border-b border-b-gray-100 pb-2 ml-10">
      <p>DATA ASSET DETAIL</p>
      <h2 className="text-4xl">DataUnion.app - Image & Annotation Vault 📸</h2>
    </div>
  )
}
