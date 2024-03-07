import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const WorkFilledIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={21} height={20} viewBox='0 0 21 20' fill='none' {...style}>
      <Path
        d='M.5 4.167A4.167 4.167 0 014.667 0h11.666A4.167 4.167 0 0120.5 4.167v11.666A4.167 4.167 0 0116.333 20H4.667A4.167 4.167 0 01.5 15.833V4.167zm10.833 10a.833.833 0 00.834.833h3.75a.833.833 0 000-1.667h-3.75a.833.833 0 00-.834.834zm.834-7.5a.833.833 0 000 1.666h3.75a.833.833 0 000-1.666h-3.75zM9.423 11.91a.833.833 0 00-1.18 0l-1.91 1.912-.656-.659a.834.834 0 00-1.18 1.179l1.246 1.248a.833.833 0 001.18 0l2.5-2.5a.834.834 0 000-1.18zm0-5.487a.835.835 0 00-1.18-1.18l-1.91 1.912-.656-.658a.834.834 0 10-1.18 1.18l1.246 1.246a.833.833 0 001.18 0l2.5-2.5z'
        fill='currentColor'
      />
    </Svg>
  )
}
