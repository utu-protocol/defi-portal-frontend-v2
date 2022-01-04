import React from 'react'
import UserAvatar from './UserAvatar'
import '@ututrust/web-components'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-utu-root': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'x-utu-feedback-form-popup': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      'x-utu-feedback-details-popup': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const maxItemsToShow = 8
const ethereumAddressLength = 42

export default function TrustEngine({
                                      summaryImages,
                                      summaryText,
                                      index
                                    }: { summaryImages: string[], summaryText: string; index: number }) {
  let countToShow = maxItemsToShow - index * 2
  countToShow = countToShow > 2 ? countToShow : 2


  const itemsToShow = (summaryImages || []).slice(0, countToShow)
  const itemsToHide = (summaryImages || []).length - itemsToShow.length
  return <div className=''>
    <div className='text-sm leading-5 text-gray-700'>
      {summaryText}
      {summaryText == undefined ? '' : <x-utu-root source-uuid='user-1' target-type='provider'>
        <x-utu-feedback-form-popup source-uuid='user-1' target-uuid='offer.id' transaction-id='offer.id'>
        </x-utu-feedback-form-popup>
        <x-utu-feedback-details-popup target-uuid='offer.id'>
        </x-utu-feedback-details-popup>
      </x-utu-root>}
      {/*<x-utu-root source-uuid='user-1' target-type='provider'>*/}
      {/*  <x-utu-feedback-form-popup source-uuid='user-1' target-uuid='offer.id' transaction-id='offer.id'>*/}
      {/*  </x-utu-feedback-form-popup>*/}
      {/*  <x-utu-feedback-details-popup target-uuid="offer.id">*/}
      {/*  </x-utu-feedback-details-popup>*/}
      {/*</x-utu-root>*/}
    </div>

    {itemsToShow.length > 0 ? (<div className='flex items-center space-x-2 mt-2'>
      <div className='flex flex-shrink-0 space-x-2'>
        {itemsToShow.map((item) => {
          const address = item.substring(item.length - ethereumAddressLength)
          // return <img key={index} className={`max-w-none h-6 w-6 rounded-full text-utu-100 shadow-solid`} src={item} alt="" />
          return <span key={address} className='block'><UserAvatar size={32} address={address} /></span>
        })}

      </div>

      {
        itemsToHide > 0 && <span className='flex-shrink-0 text-xs leading-5 font-medium'>+{itemsToHide}</span>
      }

    </div>) : null}


  </div>
}