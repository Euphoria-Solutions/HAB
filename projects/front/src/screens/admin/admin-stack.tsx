import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CustomStackHeader } from '../../components/custom'
import { RootAdminStackParamList } from '../../navigation/types'
import { AdminHome } from './admin-home'
import { AdminWorkers } from './admin-workers'
import { AdminAddWorkers } from './admin-add-worker'
import { AdminCars } from './admin-cars'
import { AdminAddCar } from './admin-add-car'

const Stack = createStackNavigator<RootAdminStackParamList>()

export const AdminStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          return (
            <CustomStackHeader
              centerTitle={route.name.includes('Add')}
              navigation={navigation}
              route={route}
              options={options}
              back={back}
            />
          )
        },
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: 'Админ',
          headerLeft: () => <></>,
        }}
        name='Home'
        component={AdminHome}
      />
      <Stack.Screen
        options={{ headerTitle: 'Админ' }}
        name='Workers'
        component={AdminWorkers}
      />
      <Stack.Screen
        options={{ headerTitle: 'Хүн нэмэх' }}
        name='AddWorker'
        component={AdminAddWorkers}
      />
      <Stack.Screen
        options={{ headerTitle: 'Админ' }}
        name='Cars'
        component={AdminCars}
      />
      <Stack.Screen
        options={{ headerTitle: 'Машин нэмэх' }}
        name='AddCar'
        component={AdminAddCar}
      />
      <Stack.Screen
        options={{ headerTitle: 'Админ' }}
        name='Schedule'
        component={AdminHome}
      />
      <Stack.Screen
        options={{ headerTitle: 'Хүргэлт нэмэх' }}
        name='AddSchedule'
        component={AdminHome}
      />
      <Stack.Screen
        options={{ headerTitle: 'Асуудалтай хүргэлт' }}
        name='Problems'
        component={AdminHome}
      />
    </Stack.Navigator>
  )
}
