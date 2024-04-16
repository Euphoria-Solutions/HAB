import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const PenIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={14} height={15} viewBox='0 0 14 15' fill='none' {...style}>
      <Path
        d='M8.418 2.747s.069 1.182 1.111 2.224c1.043 1.043 2.224 1.113 2.224 1.113l.557-.557a2.36 2.36 0 00-3.337-3.336l-.556.556L7 4.163m4.752 1.92L8.598 9.24 6.737 11.1l-.096.096c-.347.346-.52.52-.711.668a3.93 3.93 0 01-.727.45c-.218.104-.45.181-.915.336l-1.969.656m0 0l-.48.161a.636.636 0 01-.806-.805l.16-.481m1.126 1.125l-1.125-1.125m0 0l.656-1.969c.155-.465.232-.697.336-.915a3.92 3.92 0 01.45-.727c.148-.19.322-.364.668-.71L4.9 6.263'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
      />
    </Svg>
  )
}
