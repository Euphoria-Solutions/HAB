import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const WorkFilledIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={25} height={24} viewBox='0 0 25 24' fill='none' style={style}>
      <Path
        d='M.918 5a5 5 0 015-5h14a5 5 0 015 5v14a5 5 0 01-5 5h-14a5 5 0 01-5-5V5zm13 12a1 1 0 001 1h4.5a1 1 0 100-2h-4.5a1 1 0 00-1 1zm1-9a1 1 0 000 2h4.5a1 1 0 100-2h-4.5zm-3.292 6.292a1 1 0 00-1.416 0l-2.292 2.294-.788-.79a1 1 0 10-1.416 1.414l1.496 1.498a1 1 0 001.416 0l3-3a.999.999 0 000-1.416zm0-6.584a1 1 0 10-1.416-1.416L7.918 8.586l-.788-.79a1.001 1.001 0 00-1.416 1.416l1.496 1.496a1 1 0 001.416 0l3-3z'
        fill='currentColor'
      />
    </Svg>
  )
}
