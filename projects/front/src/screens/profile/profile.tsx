// ProfileScreen.tsx
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'

type ProfileScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Profile'>
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.userInfo}>Name: John Doe</Text>
      <Text style={styles.userInfo}>Email: john.doe@example.com</Text>
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginVertical: 5,
  },
})

export default ProfileScreen
