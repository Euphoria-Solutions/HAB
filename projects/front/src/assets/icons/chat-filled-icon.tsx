import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const ChatFilledIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={21} height={20} viewBox='0 0 21 20' fill='none' {...style}>
      <Path
        d='M10.918 0c5.523 0 10 4.477 10 10s-4.477 10-10 10h-8a2 2 0 01-2-2v-8c0-5.523 4.476-10 10-10zm0 12h-3a1 1 0 000 2h3a1 1 0 000-2zm3-4h-6A1 1 0 007.8 9.993l.117.007h6a1 1 0 00.117-1.993L13.917 8z'
        fill='currentColor'
      />
    </Svg>
  )
}
