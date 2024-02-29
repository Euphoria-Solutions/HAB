import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const CloseOutlinedIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M13.621 7.467L11.087 10l2.534 2.533a.771.771 0 01-.544 1.314.77.77 0 01-.544-.226L10 11.087l-2.533 2.534a.771.771 0 01-1.314-.544.77.77 0 01.226-.544L8.913 10 6.378 7.467A.77.77 0 017.467 6.38L10 8.913l2.533-2.534a.77.77 0 011.088 1.088zM20 10A10 10 0 1110 0a10.01 10.01 0 0110 10zm-1.538 0A8.461 8.461 0 1010 18.462 8.47 8.47 0 0018.462 10z'
        fill='currentColor'
      />
    </Svg>
  )
}
