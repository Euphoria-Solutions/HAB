import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const TrashIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={13} height={15} viewBox='0 0 13 15' fill='none' {...style}>
      <Path
        d='M9.5 1.75V3h2.25a.75.75 0 110 1.5H1.25a.75.75 0 010-1.5H3.5V1.75C3.5.784 4.284 0 5.25 0h2.5C8.716 0 9.5.784 9.5 1.75zM2.996 6.675l.66 6.6a.25.25 0 00.249.225h5.19a.25.25 0 00.249-.225l.66-6.6a.75.75 0 011.492.149l-.66 6.6A1.748 1.748 0 019.095 15h-5.19a1.75 1.75 0 01-1.741-1.575l-.66-6.6a.75.75 0 111.492-.15zM5 1.75V3h3V1.75a.25.25 0 00-.25-.25h-2.5a.25.25 0 00-.25.25z'
        fill='currentColor'
      />
    </Svg>
  )
}
