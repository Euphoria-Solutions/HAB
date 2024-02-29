import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const SearchIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={17} height={17} viewBox='0 0 17 17' fill='none' {...style}>
      <Path
        d='M16 16l-4.286-4.286M1 7.25a6.25 6.25 0 1012.5 0 6.25 6.25 0 00-12.5 0z'
        stroke='#C7CDE5'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
