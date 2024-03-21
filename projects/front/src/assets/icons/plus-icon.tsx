import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const PlusIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={14} height={15} viewBox='0 0 14 15' fill='none' {...style}>
      <Path d='M14 8.5H8v6H6v-6H0v-2h6v-6h2v6h6v2z' fill='currentColor' />
    </Svg>
  )
}
