import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CustomStackHeader } from '../../components/custom'
import { WorkScreen } from './work-screen'
import { WorkCarInfo } from './work-car-info'
import { WorkReason } from './work-reason'
import { WorkDetailedInfo } from './work-detailed-info'
import { useAuth } from '../../auth/auth-provider'
import { WorkParts } from './work-parts'
import { WorkProvider } from '../../services/work-provder'

const Stack = createStackNavigator()

export const WorkStack = () => {
  const { user } = useAuth()

  return (
    <WorkProvider>
      <Stack.Navigator
        initialRouteName='Main'
        screenOptions={{
          header: ({ navigation, route, options, back }) => {
            return (
              <CustomStackHeader
                centerTitle={
                  route.name == 'DetailedInfo' ||
                  route.name == 'Reason' ||
                  route.name == 'Parts'
                }
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
            headerTitle: 'Хуваарь',
            headerLeft: () => <></>,
          }}
          name='Main'
          component={WorkScreen}
        />
        <Stack.Screen
          options={{ headerTitle: 'Хуваарь' }}
          name='Info'
          component={WorkCarInfo}
        />
        <Stack.Screen
          options={{
            headerTitle:
              user?.job == 'manager' ? 'Шалтгаан үзэх' : 'Шалтгаан бөглөх',
          }}
          name='Reason'
          component={WorkReason}
        />
        <Stack.Screen
          options={{ headerTitle: 'Нарийн мэдээлэл' }}
          name='DetailedInfo'
          component={WorkDetailedInfo}
        />
        <Stack.Screen
          options={{ headerTitle: 'Солих эд анги' }}
          name='Parts'
          component={WorkParts}
        />
      </Stack.Navigator>
    </WorkProvider>
  )
}
