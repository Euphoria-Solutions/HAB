import React from 'react'
import { Path, Svg } from 'react-native-svg'

type IconType = {
  style?: object
}

export const ConfirmIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={12} height={9} viewBox='0 0 12 9' fill='none' {...style}>
      <Path
        d='M11 1L4.333 7.667 1 4.333'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

// export default ShowIcon
