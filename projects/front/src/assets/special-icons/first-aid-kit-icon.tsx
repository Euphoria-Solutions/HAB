import * as React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const FirstAidKitIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={26} height={24} viewBox='0 0 26 24' fill='none' {...style}>
      <Path fill='#fff' d='M6.5 6.40039H19.5V20.80039H6.5z' />
      <Path
        d='M22.75 4.8h-4.875V1.6c0-.88-.731-1.6-1.625-1.6h-6.5c-.894 0-1.625.72-1.625 1.6v3.2H3.25C1.462 4.8 0 6.24 0 8v12.8C0 22.56 1.462 24 3.25 24h19.5c1.788 0 3.25-1.44 3.25-3.2V8c0-1.76-1.462-3.2-3.25-3.2zm-13-3.2h6.5v3.2h-6.5V1.6zM19.5 16h-4.875v4.8h-3.25V16H6.5v-3.2h4.875V8h3.25v4.8H19.5V16z'
        fill='#E42727'
      />
    </Svg>
  )
}
