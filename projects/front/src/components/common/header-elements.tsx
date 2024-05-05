import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAuth } from '../../auth/auth-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from '../../theme/theme-provider'
import { BellOutlinedIcon } from '../../assets/icons'

type HeaderElementsType = {
  navigation:
    | BottomTabNavigationProp<ParamListBase>
    | StackNavigationProp<ParamListBase>
}

export const HeaderElements: React.FC<HeaderElementsType> = ({
  navigation,
}) => {
  const { user } = useAuth()
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 20,
    },
    iconStyle: {
      color: theme.text,
      height: 24,
    },
    notifText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 10,
      textAlign: 'center',
    },
    notificationStyle: {
      alignItems: 'center',
      backgroundColor: theme.red,
      borderRadius: 7,
      height: 14,
      justifyContent: 'center',
      position: 'absolute',
      right: -5,
      top: -3,
      width: 14,
    },
    profile: {
      backgroundColor: theme.text,
      borderRadius: 16,
      height: 32,
      width: 32,
    },
  })

  return (
    user && (
      <View style={styles.container}>
        {user?.job == 'manager' && (
          <TouchableOpacity>
            <BellOutlinedIcon style={styles.iconStyle} />
            {user.notifications && user.notifications.length > 0 && (
              <View style={styles.notificationStyle}>
                <Text style={styles.notifText}>
                  {user.notifications.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profile} />
        </TouchableOpacity>
      </View>
    )
  )
}
