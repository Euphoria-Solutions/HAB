import React from 'react'
import { Path, Svg } from 'react-native-svg'

type IconType = {
  style?: object
}

export const EditIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={16} height={17} viewBox='0 0 16 17' fill='none' style={style}>
      <Path
        d='M8.11 10.504l4.808-4.807a6.688 6.688 0 01-2.162-1.452 6.688 6.688 0 01-1.453-2.163L4.496 6.89c-.375.375-.563.562-.724.77-.19.243-.354.507-.487.786-.112.237-.196.49-.364.992l-.885 2.654a.689.689 0 00.872.872l2.654-.885c.504-.168.755-.252.992-.364.28-.133.543-.296.787-.487.207-.161.394-.349.77-.724zm6.141-6.14A2.556 2.556 0 0010.637.748l-.577.576.025.072a5.69 5.69 0 001.36 2.158 5.69 5.69 0 002.23 1.385l.576-.577z'
        fill='currentColor'
      />
      <Path d='M1 16h14' stroke='currentColor' strokeLinecap='round' />
    </Svg>
  )
}
