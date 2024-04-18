import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const AddIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={21} height={20} viewBox='0 0 21 20' fill='none' {...style}>
      <Path
        d='M11.5 9h4v2h-4v4h-2v-4h-4V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16.001A8 8 0 0010.5 18z'
        fill='currentColor'
      />
    </Svg>
  )
}
