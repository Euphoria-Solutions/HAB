/* eslint-disable unicorn/filename-case */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeProvider } from './src/theme/theme-provider'
import { CustomStackHeader } from './src/components/custom'
import {
  AccountInfo,
  AddPostScreen,
  ChangePasswordScreen,
  HomeScreen,
  LoginScreen,
  MechanicEngineer,
  ProfileScreen,
  RequestScreen,
  TransportManager,
} from './src/screens'
import { RootStackParamList } from './src/navigation/types'
import { NavigationProvider } from './src/navigation'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              header: ({ navigation, route, options, back }) => {
                return (
                  <CustomStackHeader
                    navigation={navigation}
                    route={route}
                    options={options}
                    back={back}
                  />
                )
              },
            }}
          >
            <Stack.Screen name='Home' component={HomeScreen} />
            <Stack.Screen
              options={{ title: 'Профайл' }}
              name='Profile'
              component={ProfileScreen}
            />
            <Stack.Screen
              options={{ title: 'Нууц үг солих' }}
              name='ChangePassword'
              component={ChangePasswordScreen}
            />
            <Stack.Screen
              options={{ title: 'Санал хүсэлт' }}
              name='Request'
              component={RequestScreen}
            />
            <Stack.Screen
              options={{
                title: 'Миний мэдээлэл',
              }}
              name='AccountInfo'
              component={AccountInfo}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name='Login'
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name='MechanicEngineer'
              component={MechanicEngineer}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name='TransportManager'
              component={TransportManager}
            />
            <Stack.Screen
              options={{ title: 'Пост оруулах' }}
              name='AddPost'
              component={AddPostScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NavigationProvider>
    </ThemeProvider>
  )
}

export default App
