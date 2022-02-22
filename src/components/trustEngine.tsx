import React from 'react'
import UserAvatar from './UserAvatar'
import '@ututrust/web-components'
import { useSelector } from 'react-redux'

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
  index,
  protocolAddress
}: { summaryImages: string[], summaryText: string; index: number, protocolAddress: string }) {
  let countToShow = maxItemsToShow - index * 2
  countToShow = countToShow > 2 ? countToShow : 2

  const { provider, web3Provider, address, chainId } = useSelector(
    (state: any) => state.wallet
  )
  const itemsToShow = (summaryImages || []).slice(0, countToShow)
  const itemsToHide = (summaryImages || []).length - itemsToShow.length

  console.log(protocolAddress);

  return <div className=''>
    <div className='flex justify-around text-sm leading-5'>
      <div className="mx-8" >{summaryText}</div>
      <div className="flex flex-col w-80">
        {summaryText == null ? '' : <div><x-utu-root source-uuid={address} target-type='product'>
          <x-utu-feedback-details-popup target-uuid={protocolAddress}>
          </x-utu-feedback-details-popup>
          {summaryText.includes('You used') ?
            <x-utu-feedback-form-popup source-uuid={address} target-uuid={protocolAddress} transaction-id={address} endorsement-network={process.env.REACT_APP_UTU_ENDORSEMENT_NETWORK}>
            </x-utu-feedback-form-popup> : ''}
        </x-utu-root></div>}
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
    </div>

    {/* {itemsToShow.length > 0 ? (<div className='flex items-center space-x-2 mt-2'>
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

    </div>) : null} */}


  </div>
}