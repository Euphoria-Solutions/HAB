import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const HeadPhoneIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={18} height={20} viewBox='0 0 18 20' fill='none' {...style}>
      <Path
        d='M0 8.989A8.989 8.989 0 018.989 0a8.989 8.989 0 018.988 8.989v4.633c0 1.48-1.276 2.558-2.696 2.558h-2.697V8.989h3.596a7.19 7.19 0 10-14.382 0h3.595v7.19h-1.74a1.797 1.797 0 001.74 1.35H6.8a1.57 1.57 0 011.29-.675h1.799a1.573 1.573 0 010 3.146H8.09a1.57 1.57 0 01-1.29-.674H5.392a3.595 3.595 0 01-3.583-3.29C.786 15.697 0 14.783 0 13.622V8.99zm3.596 5.393v-3.595H1.798v2.835c0 .353.332.76.899.76h.899zm12.584-3.595h-1.798v3.595h.899c.566 0 .899-.407.899-.76v-2.835z'
        fill='currentColor'
      />
    </Svg>
  )
}
