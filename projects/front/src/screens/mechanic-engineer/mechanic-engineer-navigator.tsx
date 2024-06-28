import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  WorkIcon,
  WorkFilledIcon,
  ChatFilledIcon,
  ChatIcon,
  HomeIcon,
  SOSFilledIcon,
  SOSIcon,
  HomeFilledIcon,
} from '../../assets/icons/'
import { CustomBottomTabBar, CustomTabHeader } from '../../components/custom'
import { NewsScreen, SOSStack, WorkStack } from '../'
import { ComingSoon } from '../test-screen/coming-soon'

const Tab = createBottomTabNavigator()

export const MechanicEngineer: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}
      initialRouteName='Home'
      screenOptions={{
        header: ({ navigation, route, options }) => {
          return (
            <CustomTabHeader
              navigation={navigation}
              route={route}
              options={options}
            />
          )
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={NewsScreen}
        options={{
          title: 'Нүүр',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <HomeFilledIcon
                style={{ height: size, width: size, color: color }}
              />
            ) : (
              <HomeIcon style={{ height: size, width: size, color: color }} />
            ),
        }}
      />
      <Tab.Screen
        name='Work'
        component={WorkStack}
        options={{
          headerShown: false,
          title: 'Ажил',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <WorkFilledIcon
                style={{ height: size, width: size, color: color }}
              />
            ) : (
              <WorkIcon style={{ height: size, width: size, color: color }} />
            ),
        }}
      />
      <Tab.Screen
        name='ComingSoon'
        component={ComingSoon}
        options={{
          title: 'Чат',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <ChatFilledIcon
                style={{ height: size, width: size, color: color }}
              />
            ) : (
              <ChatIcon style={{ height: size, width: size, color: color }} />
            ),
        }}
      />
      <Tab.Screen
        name='SOS'
        component={SOSStack}
        options={{
          headerShown: false,
          title: 'SOS',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <SOSFilledIcon
                style={{ height: size, width: size, color: color }}
              />
            ) : (
              <SOSIcon style={{ height: size, width: size, color: color }} />
            ),
        }}
      />
    </Tab.Navigator>
  )
}
