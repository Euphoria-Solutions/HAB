export type QueryType = 'carNumber' | 'id' | 'driver' | 'date' | ''
export type QueryNameType = {
  title: string | Date
  name: QueryType
}
export type DataType = {
  carNumber: string
  state: 'waiting' | 'being processed' | 'finished'
  date: Date
  progress: string
  id: string
  location: string
  driver: string
}
export type IconType = {
  style?: object
}
