import React, { ReactElement } from 'react'

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export type UserAvatarProps = {
  address: string
  size?: number
}
export default function UserAvatar({
  address,
  size,
}: UserAvatarProps): ReactElement {
  return <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
}
