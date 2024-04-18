import { CarProblemType } from '../utils/interface'

export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Login: undefined
  ChangePassword: undefined
  Request: undefined
  AccountInfo: undefined
  MechanicEngineer: undefined
  TransportManager: undefined
}

export type RootBottomTabParamList = {
  Home: undefined
  Work: undefined
  SOS: undefined
  Chat: undefined
}

export type RootSOSStackParamList = {
  Main: undefined
  Contact: undefined
  FixInfo: undefined
}

export type RootWorkStackParamList = {
  Main: undefined
  Info: undefined | { id: string }
  Reason: undefined | { data: CarProblemType[] }
  DetailedInfo: undefined | { id: number }
}

export type RootManagerStackParamList = {
  Home: undefined
  Admin: undefined
  AddPost: undefined | { editId?: string | number }
  Work: undefined
}
