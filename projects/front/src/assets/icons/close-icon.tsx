import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const CloseIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={15} height={15} viewBox='0 0 15 15' fill='none' {...style}>
      <Path
        d='M10.607 10.607L3.536 3.536M10.742 3.671l-7.07 7.071'
        stroke='#EEF0F9'
        strokeWidth={2}
        strokeLinecap='round'
      />
    </Svg>
  )
}
