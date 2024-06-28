// ProfileScreen.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import {
  BellIcon,
  BookIcon,
  HeadPhoneIcon,
  MoonIcon,
  PhoneIcon,
  ProfileIcon,
} from '../../assets/icons/'
import { ListContainer } from '../../components/common'
import { CustomSwitch } from '../../components/custom'
import { useAuth } from '../../auth/auth-provider'

type ProfileScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Profile'>
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(false)
  const { user } = useAuth()

  const navigateToRequest = () => {
    navigation.navigate('Request')
  }
  const navigateToAccountInfo = () => {
    navigation.navigate('AccountInfo')
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 25,
      height: '100%',
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    profilePictureStyle: {
      backgroundColor: theme.text,
      borderRadius: 35,
      height: 70,
      width: 70,
    },
    roleText: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 12,
    },
    settingsIcon: {
      backgroundColor: theme.lightBg,
      borderRadius: 11,
      color: theme.darktext,
      height: 20,
      width: 20,
    },
    settingsTitle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
      marginBottom: 10,
    },
    titleStyle: {
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    userInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    userNameContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 18,
    },
    userNameStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userNameContainer}>
          <View style={styles.profilePictureStyle}></View>
          <View>
            <Text style={styles.userNameStyle}>
              {user?.lastname}
              {user?.firstname}
            </Text>
            <Text style={styles.roleText}>{user?.job}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.settingsTitle}>Тохиргоо</Text>
        <ListContainer
          itemOptions={{ allTitleStyle: styles.titleStyle, allDisabled: true }}
          items={[
            {
              title: 'Миний мэдээлэл',
              content: 'default',
              titleIcon: <ProfileIcon style={styles.settingsIcon} />,
              onPress: navigateToAccountInfo,
              disabled: false,
            },
            {
              title: 'Шөнийн горим',
              content: (
                <CustomSwitch value={isDarkMode} setValue={toggleTheme} />
              ),
              titleIcon: <MoonIcon style={styles.settingsIcon} />,
            },
            {
              title: 'Апп мэдэгдэл',
              content: (
                <CustomSwitch
                  value={notifications}
                  setValue={setNotifications}
                />
              ),
              titleIcon: <BellIcon style={styles.settingsIcon} />,
            },
          ]}
        />
      </View>
      <View>
        <Text style={styles.settingsTitle}>Тусламж</Text>
        <ListContainer
          itemOptions={{ allTitleStyle: styles.titleStyle }}
          items={[
            {
              title: 'Заавар',
              content: 'default',
              titleIcon: <BookIcon style={styles.settingsIcon} />,
            },
            {
              title: 'Санал хүсэлт',
              content: 'default',
              titleIcon: <HeadPhoneIcon style={styles.settingsIcon} />,
              onPress: navigateToRequest,
            },
            {
              title: 'Холбоо барих',
              content: 'default',
              titleIcon: <PhoneIcon style={styles.settingsIcon} />,
            },
          ]}
        />
      </View>
    </View>
  )
}
