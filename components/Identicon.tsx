import React,{ReactElement} from 'react';
// import makeBlockie from 'ethereum-blockies-base64';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export default function Identicon({ address, size }: { address: string, size?: number }): ReactElement {
//   const data = makeBlockie(address)
  return       <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
}