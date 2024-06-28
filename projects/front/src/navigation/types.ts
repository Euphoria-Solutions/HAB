import { CarProblemType } from '../utils/interface'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  Profile: undefined
  Login: undefined
  ChangePassword: undefined
  Request: undefined
  AccountInfo: undefined
  MechanicEngineer: undefined
  TransportManager: undefined
  AddPost: undefined | { postId: string | null }
  EditPost: undefined | { postId: string | null }
  Notification: undefined
  Driver: undefined
  HABEngineer: undefined
  AdminAddSchedule: undefined
}

export type RootBottomTabParamList = {
  Home: undefined
  Work: undefined
  SOS: undefined
  ComingSoon: undefined
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
  Parts: undefined
}

export type RootManagerStackParamList = {
  Home: undefined
  Admin: undefined
  AddPost: undefined
  Work: undefined
  ComingSoon: undefined
}

export type RootEngineerStackParamList = {
  Home: undefined
  SOS: undefined
  AddPost: undefined
  Work: undefined
  ComingSoon: undefined
}

export type RootAdminStackParamList = {
  Home: undefined
  Workers: { reload: boolean } | undefined
  AddWorker: undefined
  Cars: undefined
  AddCar: undefined
  Schedule: undefined
  AddSchedule: undefined
  Problems: undefined
}

export type WorkersNavigationProp = StackNavigationProp<
  RootAdminStackParamList,
  'Workers'
>

export type WorkersRouteProp = RouteProp<RootAdminStackParamList, 'Workers'>
