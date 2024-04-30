import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const TruckOutlinedIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={22} height={20} viewBox='0 0 22 20' fill='none' {...style}>
      <Path
        d='M16 19c1.38 0 2.5-1.151 2.5-2.571 0-1.42-1.12-2.572-2.5-2.572s-2.5 1.152-2.5 2.572C13.5 17.849 14.62 19 16 19zM7.25 19c1.38 0 2.5-1.151 2.5-2.571 0-1.42-1.12-2.572-2.5-2.572s-2.5 1.152-2.5 2.572c0 1.42 1.12 2.571 2.5 2.571z'
        stroke='currentColor'
        strokeWidth={1.5}
      />
      <Path
        d='M2.25 10h7.5V1m0 0v2.571H1v10.286c0 .682.263 1.336.732 1.818a2.465 2.465 0 001.768.754h1.25M9.75 1h5l5.781 4.757c.146.12.264.273.346.447.08.173.123.363.123.556v1.954m0 0h-5V3.571h1.25M21 8.714v5.143a2.61 2.61 0 01-.732 1.818 2.465 2.465 0 01-1.768.754m-5 0H9.75'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
