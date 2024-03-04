import React from 'react'
import { Mask, Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const HomeIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={25} height={24} viewBox='0 0 25 24' fill='none' {...style}>
      <Path
        d='M3.642 7.022V7.02l6.468-5.046s0 0 0 0c.56-.437 1.367-.703 2.238-.724.872-.02 1.692.208 2.275.617 0 0 0 0 0 0h.001l7.415 5.203.003.001c.386.27.806.766 1.132 1.392.327.625.494 1.255.494 1.729v8.748c0 2.09-1.712 3.809-3.802 3.809H5.969c-2.088 0-3.802-1.718-3.802-3.821v-8.904c0-.437.15-1.034.446-1.639.296-.604.678-1.091 1.029-1.364z'
        stroke='currentColor'
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Mask id='a' fill='#fff'>
        <Path d='M12.918 19.193v-3.605 3.605z' />
      </Mask>
      <Path
        d='M11.918 19.193a1 1 0 102 0h-2zm2-3.605a1 1 0 10-2 0h2zm0 3.605v-3.605h-2v3.605h2z'
        fill='currentColor'
        mask='url(#a)'
      />
    </Svg>
  )
}
