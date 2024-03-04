import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { SOSScreen } from './sos-screen'
import { CustomStackHeader } from '../../components/custom'
import { SOSContact } from './sos-contact'
import { SOSFixInfo } from './sos-fix-info'

const Stack = createStackNavigator()

export const SOSStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Main'
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          return (
            <CustomStackHeader
              centerTitle={false}
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
          headerTitle: 'Яаралтай түргэн тусламж',
          headerLeft: () => <></>,
        }}
        name='Main'
        component={SOSScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Холбоо барих' }}
        name='Contact'
        component={SOSContact}
      />
      <Stack.Screen
        options={{ headerTitle: 'Мэдээлэл засах' }}
        name='FixInfo'
        component={SOSFixInfo}
      />
    </Stack.Navigator>
  )
}
