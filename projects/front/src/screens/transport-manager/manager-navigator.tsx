import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
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
import { NewsScreen } from '../news/news'
import { WorkStack } from '../work/work-stack'

const Tab = createBottomTabNavigator()

export const TransportManager: React.FC = () => {
  return (
    <NavigationContainer independent>
      <Tab.Navigator
        tabBar={props => <CustomBottomTabBar {...props} />}
        initialRouteName='News'
        screenOptions={{
          header: ({ navigation, route, options }) => {
            return (
              <CustomTabHeader
                navigation={navigation}
                route={route}
                options={options}
                showBorder={false}
              />
            )
          },
        }}
      >
        <Tab.Screen
          name='Home'
          component={NewsScreen}
          options={{
            headerTitle: 'Өглөөний мэнд, Алдарсүх!',
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
          name='AddPost'
          component={NewsScreen}
          options={{
            title: 'Пост',
            tabBarStyle: {
              display: 'none',
            },
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
          name='Chat'
          component={NewsScreen}
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
          name='Admin'
          component={NewsScreen}
          options={{
            headerShown: false,
            title: 'Админ',
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
    </NavigationContainer>
  )
}
