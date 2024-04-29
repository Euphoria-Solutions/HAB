import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const InfoIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M11 7H9V5h2m0 10H9V9h2m-1-9a10 10 0 100 20 10 10 0 000-20z'
        fill='currentColor'
      />
    </Svg>
  )
}
