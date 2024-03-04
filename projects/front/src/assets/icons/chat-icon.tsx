import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const ChatIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={23} height={22} viewBox='0 0 23 22' fill='none' {...style}>
      <Path
        d='M11.918 0c6.075 0 11 4.925 11 11s-4.925 11-11 11h-8.8a2.2 2.2 0 01-2.2-2.2V11c0-6.075 4.924-11 11-11zm0 2.2a8.8 8.8 0 00-8.8 8.8v8.8h8.8a8.8 8.8 0 100-17.6zm0 11a1.1 1.1 0 01.128 2.192l-.128.008h-3.3a1.1 1.1 0 01-.13-2.192l.13-.008h3.3zm3.3-4.4a1.1 1.1 0 010 2.2h-6.6a1.1 1.1 0 010-2.2h6.6z'
        fill='currentColor'
      />
    </Svg>
  )
}
