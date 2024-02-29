import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const MoonIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M10 20c-2.778 0-5.139-.972-7.083-2.917C.972 15.14 0 12.778 0 10c0-2.778.972-5.139 2.917-7.083C4.86.972 7.222 0 10 0c.26 0 .514.01.764.028.25.018.496.046.736.083A5.884 5.884 0 009.68 2.21 5.886 5.886 0 009 5c0 1.667.583 3.083 1.75 4.25C11.917 10.417 13.333 11 15 11a5.87 5.87 0 002.806-.681A5.924 5.924 0 0019.889 8.5 10.342 10.342 0 0120 10c0 2.778-.972 5.139-2.917 7.083C15.14 19.028 12.778 20 10 20z'
        fill='currentColor'
      />
    </Svg>
  )
}
