import React, { createContext, useState, useContext, ReactNode } from 'react'
import {
  DataType,
  MechanicalCheckList,
  Presciption,
  WorkContextType,
} from '../utils'

const WorkContext = createContext<WorkContextType | undefined>(undefined)

export const WorkProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workData, setWorkData] = useState<DataType[]>([])
  const [workId, setWorkId] = useState<string>()
  const [mechanic, setMechanic] = useState<MechanicalCheckList>()
  const [prescription, setPrescription] = useState<Presciption>()

  return (
    <WorkContext.Provider
      value={{
        workData,
        setWorkData,
        workId,
        setWorkId,
        mechanic,
        setMechanic,
        prescription,
        setPrescription,
      }}
    >
      {children}
    </WorkContext.Provider>
  )
}

export const useWork = (): WorkContextType => {
  const context = useContext(WorkContext)
  if (!context) {
    throw new Error('useWork must be used within a WorkProvider')
  }
  return context
}
