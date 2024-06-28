import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useAuth } from '../../auth/auth-provider'

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { user } = useAuth()

  useEffect(() => {
    if (user == null) {
      navigation.navigate('Login')
    }
  }, [])

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  )
}
