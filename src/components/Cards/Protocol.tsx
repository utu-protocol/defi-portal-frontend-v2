import TrustEngine from '../trustEngine';
import React from 'react'
import { switchNetwork } from '../../redux/actions/wallet.actions';

export default function ProtocolCard({ protocol, index }: { protocol: any, index: number }) {
    const relationshipsFound =
        protocol.summaryImages.length > 0 || protocol.summaryText?.length > 0

    const openLink = async () => {
        if (!protocol.entity.properties.url) return;
        await switchNetwork();
        window.open(protocol.entity.properties.url, '_blank')?.focus();
    };

    return (
        <div className="flex py-3">
            <div
                onClick={() => openLink()}
                className={`flex flex-1 justify-between cursor-pointer ${relationshipsFound || index === 0 ? 'border-yellow-200' : 'border-gray-200'} ${relationshipsFound ? 'bg-white hover:bg-yellow-200' : 'hover:bg-gray-50'}`}
            >

                <div className="flex flex-1">
                    <div className="flex-shrink-0 px-4">
                        <img alt={protocol.entity.name.toLowerCase()} className={`h-12 w-12 rounded-full ${relationshipsFound ? '' : ' text-gray-200'}`}
                            src={`/protocols/${protocol.entity.name.toLowerCase()}.png`}
                        />
                    </div>
                    <div className="flex-1 pr-16">
                        <div
                            className={`mt-1 text-xl leading-5 font-medium truncate text-gray-900`}
                        >
                            {protocol.entity.name}{' '}
                            <span
                                className={`max-w-fit text-xs text-gray-500`}
                            >
                                [{protocol.entity.properties.category}]
                            </span>
                        </div>
                        <div
                            className={`mt-1 flex items-center text-sm leading-5 ${relationshipsFound
                                ? 'text-gray-700'
                                : 'text-gray-500'
                                }`}
                        >
                            <div>
                                {protocol.entity.properties.description}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pr-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </div>
            </div>
            <div className="flex-1">
                <TrustEngine summaryImages={protocol.summaryImages} summaryText={protocol.summaryText} protocolAddress={protocol?.entity?.ids?.address} index={index}></TrustEngine>
            </div>
        </div>)
}