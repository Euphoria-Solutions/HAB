import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const ElectricityIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M9.083 12.727H4.5L10.917 0v7.273H15.5L9.083 20v-7.273z'
        fill='currentColor'
      />
    </Svg>
  )
}
