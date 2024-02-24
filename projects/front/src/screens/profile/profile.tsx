// ProfileScreen.tsx
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { EditIcon } from '../../assets/icons/edit-icon'
import { RightArrowIcon } from '../../assets/icons/right-arrow-icon'
import CustomSwitch from '../../components/custom/custom-switch'

type ProfileScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Profile'>
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [notifications, setNotifications] = useState(false)

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword')
  }
  const navigateToRequest = () => {
    navigation.navigate('Request')
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      paddingHorizontal: 20,
    },
    divider: {
      backgroundColor: theme.border,
      height: 1,
      marginHorizontal: 12,
    },
    editIconStyle: {
      color: theme.text,
      marginTop: 14,
    },
    iconContainer: {
      alignItems: 'center',
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    profilePictureStyle: {
      backgroundColor: theme.text,
      borderRadius: 30,
      height: 60,
      width: 60,
    },
    righArrowIconStyle: {
      color: theme.iconBg,
    },
    roleStyle: {
      alignSelf: 'flex-start',
      borderColor: theme.green,
      borderRadius: 100,
      borderWidth: 2,
      flexGrow: 0,
      padding: 4,
      paddingHorizontal: 22,
    },
    roleText: {
      color: theme.green,
      fontSize: 10,
      fontWeight: 'bold',
    },
    settingsContainer: {
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
    },
    settingsIcon: {
      backgroundColor: theme.iconBg,
      borderRadius: 11,
      height: 22,
      width: 22,
    },
    settingsName: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    settingsStyle: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
    },
    settingsText: {
      color: theme.darktext,
      fontSize: 14,
      fontWeight: 'bold',
    },
    settingsTitle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 16,
    },
    userInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    userNameContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: 8,
    },
    userNameStyle: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 'bold',
      margin: 5,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userNameContainer}>
          <View style={styles.profilePictureStyle}></View>
          <View>
            <Text style={styles.userNameStyle}>Мөрөнгуа Насанбаяр</Text>
            <View style={styles.roleStyle}>
              <Text style={styles.roleText}>Тээвэр зохицуулагч</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <EditIcon style={styles.editIconStyle} />
        </TouchableOpacity>
      </View>
      <Text style={styles.settingsTitle}>Тохиргоо</Text>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          onPress={navigateToChangePassword}
          style={styles.settingsStyle}
        >
          <View style={styles.settingsName}>
            <View style={styles.settingsIcon}></View>
            <Text style={styles.settingsText}>Нууц үг солих</Text>
          </View>
          <View style={styles.iconContainer}>
            <RightArrowIcon style={styles.righArrowIconStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <View style={styles.settingsStyle}>
          <View style={styles.settingsName}>
            <View style={styles.settingsIcon}></View>
            <Text style={styles.settingsText}>Апп мэдэгдэл</Text>
          </View>
          <CustomSwitch value={notifications} setValue={setNotifications} />
        </View>
      </View>
      <Text style={styles.settingsTitle}>Тусламж</Text>
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingsStyle}>
          <View style={styles.settingsName}>
            <View style={styles.settingsIcon}></View>
            <Text style={styles.settingsText}>Заавар</Text>
          </View>
          <View style={styles.iconContainer}>
            <RightArrowIcon style={styles.righArrowIconStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity
          onPress={navigateToRequest}
          style={styles.settingsStyle}
        >
          <View style={styles.settingsName}>
            <View style={styles.settingsIcon}></View>
            <Text style={styles.settingsText}>Санал хүсэлт</Text>
          </View>
          <View style={styles.iconContainer}>
            <RightArrowIcon style={styles.righArrowIconStyle} />
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.settingsStyle}>
          <View style={styles.settingsName}>
            <View style={styles.settingsIcon}></View>
            <Text style={styles.settingsText}>Холбоо барих</Text>
          </View>
          <View style={styles.iconContainer}>
            <RightArrowIcon style={styles.righArrowIconStyle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProfileScreen
