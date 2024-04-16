import React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'

type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title='Go to Profile'
        onPress={() => navigation.navigate('Profile')}
      />
      <Button
        title='Go to Login'
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title='Go to Mechanic Engineer'
        onPress={() => navigation.navigate('MechanicEngineer')}
      />
      <Button
        title='Go to Transport Manager'
        onPress={() => navigation.navigate('TransportManager')}
      />
    </View>
  )
}
