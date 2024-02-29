import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const PhoneIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={19} height={20} viewBox='0 0 19 20' fill='none' {...style}>
      <Path
        d='M17.847 13.446l-4.416-2.111-.013-.006a1.415 1.415 0 00-1.492.196L9.644 13.6c-1.446-.75-2.938-2.33-3.64-3.851l1.948-2.471c.019-.025.036-.05.053-.077a1.696 1.696 0 00.124-1.506v-.012L6.144.963a1.57 1.57 0 00-.63-.751 1.422 1.422 0 00-.928-.2C3.316.19 2.15.856 1.306 1.884A5.85 5.85 0 000 5.6C0 13.54 6.056 20 13.5 20a5.087 5.087 0 003.484-1.393c.964-.9 1.588-2.144 1.755-3.5a1.69 1.69 0 00-.187-.988c-.16-.3-.408-.536-.705-.673zM13.5 18.4c-3.181-.004-6.232-1.353-8.481-3.753-2.25-2.4-3.516-5.653-3.519-9.047a4.18 4.18 0 01.928-2.657A3.706 3.706 0 014.769 1.6v.012l1.969 4.7L4.8 8.786a.612.612 0 00-.053.077 1.692 1.692 0 00-.094 1.57c.85 1.853 2.6 3.706 4.355 4.61a1.419 1.419 0 001.546-.17l2.28-2.073 4.406 2.105h.01a4.107 4.107 0 01-1.257 2.502 3.635 3.635 0 01-2.493.993z'
        fill='currentColor'
      />
    </Svg>
  )
}
