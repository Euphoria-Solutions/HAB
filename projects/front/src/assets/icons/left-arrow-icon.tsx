import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const LeftArrowIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={11} height={18} viewBox='0 0 11 18' fill='none' style={style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.616 9.884a1.25 1.25 0 010-1.768l7.5-7.5a1.25 1.25 0 111.768 1.768L3.268 9l6.616 6.616a1.25 1.25 0 01-1.768 1.768l-7.5-7.5z'
        fill='currentColor'
      />
    </Svg>
  )
}
