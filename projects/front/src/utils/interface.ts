export type QueryType = 'license' | '_id' | 'driver' | 'date' | ''
export type QueryNameType = {
  title: string | Date
  name: QueryType
}
export type StateType = 'waiting' | 'being processed' | 'finished'
export type DataType = {
  license: string
  state: string
  date: Date
  progress: string
  _id: string
  location: string
  driver: string
  trailerNumber: string
  trailerNumber2?: string
  signature: string
  managerState?: string
  contractNumber?: string
  mechanicCheckList: string
  prescription: string
}
export type IconType = {
  style?: object
}
export type TagType = {
  search: string
  timeFrame: string
}
export type CarInfoType = {
  name: string
  state: string
  type: string
  quality: string
}
export type CarProblemType = {
  title: string
  reason: string
  parts: { value: string; label: string }[]
}
export type CarReasonType = {
  title: string
  problems: CarProblemType[]
}
export type EngineType = 'engine' | 'disk' | 'transmission' | 'other'
export type NewsType = {
  username: string
  photo?: string
  job: string
  date: Date
  text?: string
  imageLinks?: string[]
  id: string
  viewer: 'everyone' | 'worker' | 'driver' | 'engineer'
}
export type WorkerType = {
  firstname: string
  lastname: string
  job: 'driver' | 'engineer' | 'manager' | 'mechanic'
  mobileNumber: number
  username: string
  _id: string
}
export type ScheduleType = {
  contractNumber: string
  date: Date
  _id: string
  pickupPoint: string
  location: string
  deliveryLocation: string
  companyName: string
  exitDate: Date
  driver: {
    name: string
    profile?: string | undefined
  }
  license: string
  trailerNumber1: string
  trailerNumber2: string
  state: 'failed' | 'success'
}
export type NotificationType = {
  request: 'userChange' | 'problem'
  title: string
  userRequested: string
  change?: {
    reason?: string
    id?: string
    username?: string
    phoneNumber?: string
    job?: 'mechanic' | 'engineer' | 'manager' | 'driver'
    firstname?: string
    lastname?: string
  }
}
export type UserType = {
  _id: string
  username: string
  phoneNumber: string
  job: 'mechanic' | 'engineer' | 'manager' | 'driver'
  firstname: string
  lastname: string
  notifications?: NotificationType[]
}

export type WorkContextType = {
  workData: DataType[]
  setWorkData: (_data: DataType[]) => void
  workId: string | undefined
  setWorkId: (_data: string | undefined) => void
  mechanic: MechanicalCheckList | undefined
  setMechanic: (_data: MechanicalCheckList | undefined) => void
  prescription: Presciption | undefined
  setPrescription: (_data: Presciption | undefined) => void
}

export type VehicleType = {
  license: string
  trailerNumber1: string
  trailerNumber2: string
  manufacturedCountry: string
  date: string
  engineNumber: string
  ramNumber: string
  tonnage: string
  dateOfArrival: string
  certificate: string
  dateOfUse: string
  price: string
  durability: string
  fuel: string
  enginePower: string
}

type Parts = {
  value: string
  label: string
}

export type Problems = {
  name: string
  title: string
  reason: string
  parts: [Parts]
  images: [string]
}

export type MechanicalCheckList = {
  _id: string | undefined
  data: CarInfoType[] | undefined
  problem: Problems[] | undefined
  vehicle: string | undefined
  mechanicEngineer: string | undefined
}

export type Presciption = {
  intructions: string[]
  responsibilities: string[]
}
