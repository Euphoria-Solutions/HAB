import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { IconType } from '../../utils/interface'

export const CalendarIcon: React.FC<IconType> = ({ style }) => {
  return (
    <Svg width={18} height={15} viewBox='0 0 18 15' fill='none' {...style}>
      <Path
        d='M4.5 1.237v2.21m9-2.21v2.21'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
      />
      <Path
        d='M0 5.184C0 3.794 0 3.1.527 2.67c.528-.432 1.376-.432 3.073-.432h10.8c1.697 0 2.545 0 3.073.432C18 3.1 18 3.795 18 5.184c0 .347 0 .521-.131.63-.133.107-.346.107-.769.107H.9c-.424 0-.636 0-.769-.108C0 5.705 0 5.531 0 5.184zm0 6.632c0 1.39 0 2.084.527 2.515.528.432 1.376.432 3.073.432h10.8c1.697 0 2.545 0 3.073-.432C18 13.9 18 13.205 18 11.816V8.132c0-.347 0-.521-.131-.63-.133-.107-.346-.107-.769-.107H.9c-.424 0-.636 0-.769.107C0 7.611 0 7.785 0 8.132v3.684z'
        fill='currentColor'
      />
    </Svg>
  )
}
