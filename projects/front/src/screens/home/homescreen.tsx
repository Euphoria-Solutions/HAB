import React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types' // Adjust the import path as necessary

// Define the type for the HomeScreen's props
type HomeScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
    </View>
  )
}

export default HomeScreen
