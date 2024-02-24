/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/home/homescreen'
import ProfileScreen from './src/screens/profile/profile'
import LoginScreen from './src/screens/login/loginscreen'
import { ThemeProvider } from './src/theme/theme-provider'
import CustomHeader from './src/components/custom/custom-header'
import ChangePasswordScreen from './src/screens/profile/change-password-screen'
import RequestScreen from './src/screens/profile/request-screen'

const Stack = createStackNavigator()

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            header: ({ navigation, route, options, back }) => {
              return (
                <CustomHeader
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
            options={{ title: 'Settings & Profile ' }}
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
            options={{ headerShown: false }}
            name='Login'
            component={LoginScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
