import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const LocationIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={6} height={8} viewBox='0 0 6 8' fill='none' {...style}>
      <Path
        d='M3 3.8c-.284 0-.557-.105-.758-.293A.967.967 0 011.93 2.8c0-.265.112-.52.313-.707.201-.188.474-.293.758-.293.284 0 .557.105.758.293.2.187.313.442.313.707a.942.942 0 01-.081.383.998.998 0 01-.232.324 1.08 1.08 0 01-.348.217c-.13.05-.27.076-.41.076zM3 0C2.204 0 1.441.295.879.82A2.709 2.709 0 000 2.8C0 4.9 3 8 3 8s3-3.1 3-5.2c0-.743-.316-1.455-.879-1.98A3.112 3.112 0 003 0z'
        fill='currentColor'
      />
    </Svg>
  )
}
