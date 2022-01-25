import React, { ReactElement } from 'react'
export default function Loader(): ReactElement {
  return (
    <div className="relative mt-1 rounded overflow-hidden">
      <div className="overflow-hidden h-2 text-xs flex bg-white w-full relative z-0 opacity-25"></div>
      <div
        style={{ width: '25%' }}
        className="shadow-none progress-bar-animation h-full rounded absolute top-0 flex flex-col text-center whitespace-nowrap text-white justify-center bg-white opacity-85"
      ></div>
    </div>
  )
}
