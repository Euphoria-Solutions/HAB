import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const RightLineIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={15} height={11} viewBox='0 0 15 11' fill='none' {...style}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M.944 5.5a.75.75 0 01.75-.75h10.19l-2.72-2.72a.75.75 0 011.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 01-1.06-1.06l2.72-2.72H1.694a.75.75 0 01-.75-.75z'
        fill='currentColor'
      />
    </Svg>
  )
}
