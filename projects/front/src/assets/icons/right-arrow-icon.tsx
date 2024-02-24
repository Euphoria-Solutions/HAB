import React from 'react'
import { Path, Svg } from 'react-native-svg'

type IconType = {
  style?: object
}

export const RightArrowIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={9} height={14} viewBox='0 0 9 14' fill='none' style={style}>
      <Path
        d='M2 12l5-5-5-5'
        stroke='currentColor'
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
