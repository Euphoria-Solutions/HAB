import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const TruckWarningIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={17} viewBox='0 0 20 17' fill='none' {...style}>
      <Path
        d='M1.818.5C.818.5 0 1.4 0 2.5v11h1.818c0 1.7 1.182 3 2.727 3 1.546 0 2.728-1.3 2.728-3h5.454c0 1.7 1.182 3 2.727 3 1.546 0 2.728-1.3 2.728-3H20v-5l-2.727-4h-2.727v-4H1.818zm4.546 2h1.818v4H6.364v-4zM14.545 6h2.273l1.818 2.5h-4.09V6zM6.365 8.5h1.818v2H6.364v-2zM4.545 12c.728 0 1.364.7 1.364 1.5S5.273 15 4.545 15c-.727 0-1.363-.7-1.363-1.5S3.818 12 4.545 12zm10.91 0c.727 0 1.363.7 1.363 1.5s-.636 1.5-1.364 1.5c-.727 0-1.363-.7-1.363-1.5s.636-1.5 1.364-1.5z'
        fill='currentColor'
      />
    </Svg>
  )
}
