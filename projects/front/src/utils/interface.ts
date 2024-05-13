export type QueryType = 'carNumber' | 'id' | 'driver' | 'date' | ''
export type QueryNameType = {
  title: string | Date
  name: QueryType
}
export type StateType = 'waiting' | 'being processed' | 'finished'
export type DataType = {
  carNumber: string
  state: StateType
  date: Date
  progress: string
  id: string
  location: string
  driver: string
  trailerNumber: string
  trailerNumber2?: string
  signature: boolean
  managerState?:
    | 'delivered'
    | 'confirmed'
    | 'problem'
    | 'engineer'
    | 'manager'
    | 'mechanic'
    | 'time'
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
  state: 'waiting' | 'finished' | 'being processed'
  type: 'engine' | 'disk' | 'transmission' | 'other'
  quality: QualityType
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
export type QualityType = 'normal' | 'repair' | 'swap' | 'charge' | 'clean' | ''
export type NewsType = {
  name: string
  photo?: string
  job: string
  time: Date
  text?: string
  imageLinks?: string[]
  id: string
  viewer: 'everyone' | 'worker' | 'driver' | 'engineer'
}
export type WorkerType = {
  name: string
  surname: string
  job: 'driver' | 'engineer' | 'manager' | 'mechanic'
  mobileNumber: number
  username: string
  id: number | string
}
export type ScheduleType = {
  license: string
  date: Date
  id: number | string
  pickupPoint: string
  location: string
  deliveryLocation: string
  companyName: string
  exitDate: Date
  driver: {
    name: string
    profile?: string | undefined
  }
  carNumber: string
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
  id: string
  username: string
  phoneNumber: string
  job: 'mechanic' | 'engineer' | 'manager' | 'driver'
  firstname: string
  lastname: string
  notifications?: NotificationType[]
}
