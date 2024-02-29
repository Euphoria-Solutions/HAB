import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const EditIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...style}>
      <Path
        d='M16.898 12.375v4.32A2.306 2.306 0 0114.593 19H3.305A2.306 2.306 0 011 16.681V5.406a2.292 2.292 0 012.306-2.305h4.32'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M16.898 7.076l-3.975-3.975m-7.95 10.6v-2.107c.003-.348.14-.681.385-.928l9.274-9.274a1.325 1.325 0 011.882 0l2.093 2.093a1.322 1.322 0 010 1.882L9.333 14.64c-.247.245-.58.383-.928.384H6.3A1.325 1.325 0 014.974 13.7z'
        stroke='currentColor'
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}
