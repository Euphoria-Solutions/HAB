import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const ProfileIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.636 7.273a3.636 3.636 0 11-7.272 0 3.636 3.636 0 017.272 0zm-1.818 0a1.818 1.818 0 11-3.637 0 1.818 1.818 0 013.637 0z'
        fill='currentColor'
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zM1.818 10c0 1.9.648 3.65 1.735 5.038a8.17 8.17 0 016.506-3.22 8.168 8.168 0 016.447 3.144A8.182 8.182 0 101.818 10zM10 18.182a8.148 8.148 0 01-5.156-1.83 6.356 6.356 0 015.215-2.716 6.356 6.356 0 015.172 2.655A8.149 8.149 0 0110 18.18z'
        fill='currentColor'
      />
    </Svg>
  )
}
