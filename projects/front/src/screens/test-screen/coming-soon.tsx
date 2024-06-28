import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootManagerStackParamList } from '../../navigation/types'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { EventProvider } from 'react-native-outside-press'
import { useTheme } from '../../theme/theme-provider'
type ComingSoonProps = {
  navigation: BottomTabNavigationProp<RootManagerStackParamList, 'Home'>
}

export const ComingSoon: React.FC<ComingSoonProps> = () => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      paddingBottom: 0,
    },
    innerSection: {
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },
    text: {
      color: theme.white,
      fontSize: 24,
      fontWeight: 'bold',
    },
  })

  return (
    <EventProvider>
      <View style={styles.container}>
        <View style={styles.innerSection}>
          <Text style={styles.text}>Coming soon</Text>
        </View>
      </View>
    </EventProvider>
  )
}
