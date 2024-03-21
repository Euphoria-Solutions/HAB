import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { CustomStackHeader } from '../../components/custom'
import { WorkScreen } from './work-screen'
import { WorkCarInfo } from './work-car-info'
import { WorkReason } from './work-reason'
import { WorkDetailedInfo } from './work-detailed-info'

const Stack = createStackNavigator()

export const WorkStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Main'
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          return (
            <CustomStackHeader
              centerTitle={route.name == 'DetailedInfo'}
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
        options={{ headerTitle: 'Шалтгаан бөглөх' }}
        name='Reason'
        component={WorkReason}
      />
      <Stack.Screen
        options={{ headerTitle: 'Нарийн мэдээлэл' }}
        name='DetailedInfo'
        component={WorkDetailedInfo}
      />
    </Stack.Navigator>
  )
}
