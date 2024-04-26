import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import {
  WorkIcon,
  WorkFilledIcon,
  ChatFilledIcon,
  ChatIcon,
  HomeIcon,
  HomeFilledIcon,
  AddIcon,
  AdminFilledIcon,
  AdminIcon,
} from '../../assets/icons/'
import { CustomBottomTabBar, CustomTabHeader } from '../../components/custom'
import { NewsScreen } from '../news/news'
import { WorkStack } from '../work/work-stack'
import {
  RootManagerStackParamList,
  RootStackParamList,
} from '../../navigation/types'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNav } from '../../navigation'
import { AdminStack } from '../admin/admin-stack'

const Tab = createBottomTabNavigator<RootManagerStackParamList>()

export const TransportManager: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()
  const { id } = useNav()

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
        listeners={{
          tabPress: e => {
            e.preventDefault()
            navigation.navigate('AddPost', { postId: null })
          },
          focus: () => {
            navigation.goBack()
            navigation.navigate('TransportManager')
            navigation.navigate('AddPost', { postId: id })
          },
        }}
        options={{
          title: 'Пост',
          tabBarIcon: ({ color, size }) => (
            <AddIcon style={{ height: size, width: size, color: color }} />
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
        component={AdminStack}
        options={{
          headerShown: false,
          title: 'Админ',
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <AdminFilledIcon
                style={{ height: size, width: size, color: color }}
              />
            ) : (
              <AdminIcon style={{ height: size, width: size, color: color }} />
            ),
        }}
      />
    </Tab.Navigator>
  )
}
