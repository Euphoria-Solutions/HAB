import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const HomeFilledIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={21} height={20} viewBox='0 0 21 20' fill='none' {...style}>
      <Path
        clipRule='evenodd'
        fillRule='evenodd'
        d='M2.898 6.016l.001-.001 5.39-4.205s0 0 0 0c.425-.332 1.051-.543 1.742-.559.69-.016 1.328.165 1.771.476 0 0 0 0 0 0s0 0 0 0l6.18 4.336.003.002c.287.2.617.584.878 1.084.26.5.387.993.387 1.345v7.29a2.976 2.976 0 01-2.96 2.966H4.71c-1.624 0-2.96-1.337-2.96-2.976v-7.42c0-.324.113-.79.35-1.274.237-.483.538-.861.798-1.064z'
        fill='currentColor'
        stroke='currentColor'
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        clipRule='evenodd'
        fillRule='evenodd'
        d='M9.5 15.994a1 1 0 002 0h-2zm2-3.004a1 1 0 10-2 0h2zm0 3.004V12.99h-2v3.004h2z'
        fill='#343563'
      />
    </Svg>
  )
}
