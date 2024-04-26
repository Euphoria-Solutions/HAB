import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const CloseFilledIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={15} height={16} viewBox='0 0 15 16' fill='none' {...style}>
      <Path
        d='M7.5.5A7.5 7.5 0 1015 8 7.508 7.508 0 007.5.5zm2.716 9.4a.577.577 0 01-.816.816l-1.9-1.9-1.9 1.9a.577.577 0 01-.816-.816l1.9-1.9-1.9-1.9a.577.577 0 11.816-.816l1.9 1.9 1.9-1.9a.577.577 0 01.816.816L8.316 8l1.9 1.9z'
        fill='currentColor'
      />
    </Svg>
  )
}
