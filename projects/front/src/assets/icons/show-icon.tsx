import React from 'react'
import { Path, Svg } from 'react-native-svg'

type IconType = {
  style?: object
}

export const ShowIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg style={style} width='20' height='16' fill='none' viewBox='0 0 20 16'>
      <Path
        fill='currentColor'
        d='M12.86 2.2l-1.804 1.83a4.047 4.047 0 00-2.113 0 4.072 4.072 0 00-1.83 1.065A4.121 4.121 0 006.059 6.94a4.146 4.146 0 000 2.13l-2.815 2.827A11.398 11.398 0 010 8a11.259 11.259 0 015.41-5.185 11.134 11.134 0 017.44-.614h.01zm3.876 1.903A11.456 11.456 0 0120 8a11.258 11.258 0 01-5.42 5.193 11.134 11.134 0 01-7.451.607l1.805-1.83a4.049 4.049 0 003.942-1.065 4.12 4.12 0 001.056-1.845 4.146 4.146 0 000-2.13l2.815-2.827h-.01zM16.481 0l1.449 1.46L3.508 16 2.06 14.54 16.481 0z'
      ></Path>
    </Svg>
  )
}

// export default ShowIcon
