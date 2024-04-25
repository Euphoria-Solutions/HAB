import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const SigninIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M19 10a9 9 0 00-9-9m0 18a8.985 8.985 0 007.026-3.375'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
      />
      <Path
        d='M1 10h11.25m0 0L8.875 6.625M12.25 10l-3.375 3.375'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
