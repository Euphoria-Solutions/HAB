import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const PackageIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={16} height={18} viewBox='0 0 16 18' fill='none' {...style}>
      <Path
        d='M15.36 4.03L8.59.16a1.18 1.18 0 00-1.18 0L.64 4.03c-.193.11-.355.273-.467.471A1.33 1.33 0 000 5.156v7.688c0 .23.06.456.173.654.112.198.274.36.467.471l6.77 3.872a1.18 1.18 0 001.18 0l6.77-3.872c.193-.11.355-.273.467-.471.113-.198.172-.424.173-.654V5.157c0-.23-.06-.457-.172-.655a1.257 1.257 0 00-.468-.473zM8 1.283l6.18 3.537-2.29 1.31-6.18-3.537L8 1.284zm0 7.074L1.82 4.82 4.427 3.33l6.18 3.536L8 8.358zm6.77 4.489l-6.155 3.52V9.469l2.462-1.407v2.868c0 .17.065.334.18.455.116.12.272.188.435.188.163 0 .32-.068.435-.188a.658.658 0 00.18-.455V7.358L14.77 5.95v6.897z'
        fill='currentColor'
      />
    </Svg>
  )
}
