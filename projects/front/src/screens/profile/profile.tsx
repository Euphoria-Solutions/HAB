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
  RightArrowIcon,
} from '../../assets/icons/'
import { ListContainer, ListItem } from '../../components/common'
import { CustomSwitch } from '../../components/custom'

type ProfileScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Profile'>
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme, isDarkMode, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(false)

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
    righArrowIconStyle: {
      color: theme.iconBg,
    },
    roleText: {
      color: theme.darktext,
      fontSize: 12,
      fontWeight: '800',
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
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
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
      fontSize: 18,
      fontWeight: '800',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userNameContainer}>
          <View style={styles.profilePictureStyle}></View>
          <View>
            <Text style={styles.userNameStyle}>Мөрөнгуа Насанбаяр</Text>
            <Text style={styles.roleText}>Тээвэр зохицуулагч</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.settingsTitle}>Тохиргоо</Text>
        <ListContainer>
          <ListItem
            titleIcon={<ProfileIcon style={styles.settingsIcon} />}
            title='Миний мэдээлэл'
            content='default'
            onPress={navigateToAccountInfo}
          />
          <ListItem
            disabled
            titleIcon={<MoonIcon style={styles.settingsIcon} />}
            title='Шөнийн горим'
            content={<CustomSwitch value={isDarkMode} setValue={toggleTheme} />}
          />
          <ListItem
            disabled
            titleIcon={<BellIcon style={styles.settingsIcon} />}
            title='Апп мэдэгдэл'
            content={
              <CustomSwitch value={notifications} setValue={setNotifications} />
            }
          />
        </ListContainer>
      </View>
      <View>
        <Text style={styles.settingsTitle}>Тусламж</Text>
        <ListContainer>
          <ListItem
            titleIcon={<BookIcon style={styles.settingsIcon} />}
            title='Заавар'
            content={<RightArrowIcon style={styles.righArrowIconStyle} />}
          />
          <ListItem
            titleIcon={<HeadPhoneIcon style={styles.settingsIcon} />}
            title='Санал хүсэлт'
            content={<RightArrowIcon style={styles.righArrowIconStyle} />}
            onPress={navigateToRequest}
          />
          <ListItem
            titleIcon={<PhoneIcon style={styles.settingsIcon} />}
            title='Холбоо барих'
            content={<RightArrowIcon style={styles.righArrowIconStyle} />}
          />
        </ListContainer>
      </View>
    </View>
  )
}
