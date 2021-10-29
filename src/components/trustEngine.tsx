import React from 'react';
import UserAvatar from './UserAvatar';

const maxItemsToShow = 8;
const ethereumAddressLength = 42;

export default function TrustEngine({ summaryImages, summaryText, index }: { summaryImages: string[], summaryText: string; index: number }) {
  let countToShow = maxItemsToShow - index * 2;
  countToShow = countToShow > 2 ? countToShow : 2;

  const itemsToShow = (summaryImages || []).slice(0, countToShow);
  const itemsToHide = (summaryImages || []).length - itemsToShow.length;
  return <div className="">
    <div className="text-sm leading-5 text-gray-700">
      {summaryText}
    </div>

    {itemsToShow.length > 0 ? (<div className="flex items-center space-x-2 mt-2">
      <div className="flex flex-shrink-0 space-x-2">
        {itemsToShow.map((item) => {
          const address = item.substring(item.length - ethereumAddressLength);
          // return <img key={index} className={`max-w-none h-6 w-6 rounded-full text-utu-100 shadow-solid`} src={item} alt="" />
          return <span key={address} className="block"><UserAvatar size={32} address={address} /></span>
        })}

      </div>

      {
        itemsToHide > 0 && <span className="flex-shrink-0 text-xs leading-5 font-medium">+{itemsToHide}</span>
      }

    </div>) : null}
  </div>
}