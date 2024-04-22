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
