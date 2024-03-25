import React, { useState } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootSOSStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  AmbulanceIcon,
  FireIcon,
  FiretruckIcon,
  FirstAidKitIcon,
  PoliceIcon,
} from '../../assets/special-icons'
import { PhoneCallIcon } from '../../assets/icons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

type SOSScreenProps = {
  navigation: BottomTabNavigationProp<RootSOSStackParamList, 'Main'>
}

export const SOSScreen: React.FC<SOSScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [personalInfoPressed, setPersonalInfoPressed] = useState(false)

  const handlePressIn = () => setPersonalInfoPressed(true)
  const handlePressOut = () => setPersonalInfoPressed(false)
  const navigateToContact = () => navigation.navigate('Contact')

  const handleEmergencyCall = (number: string) => {
    Linking.openURL('tel:' + number)
  }

  const styles = StyleSheet.create({
    allCallsContainer: {
      gap: 6,
    },
    container: {
      backgroundColor: theme.bg,
      gap: 34,
      height: '100%',
      padding: 20,
      paddingBottom: 0,
    },
    sosCallContainer: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      height: 72,
      width: '100%',
    },
    sosDetailText: {
      color: theme.darktext,
      fontFamily: theme.nunito700,
      fontSize: 12,
    },
    sosNavButton: {
      flex: 1,
    },
    sosPersonalInfo: {
      alignItems: 'center',
      backgroundColor: personalInfoPressed ? theme.stroke : theme.lightBg,
      borderColor: personalInfoPressed ? theme.stroke : theme.border,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 14,
      padding: 24,
      paddingVertical: 14,
      width: '100%',
    },
    sosPhoneAndCallContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 18,
    },
    sosPhoneIconStyle: {
      color: theme.text,
    },
    sosPhoneNumberText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    sosSpecialIconContainer: {
      alignItems: 'center',
      borderColor: theme.stroke,
      borderRightWidth: 1,
      height: '100%',
      justifyContent: 'center',
      width: 72,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.allCallsContainer}>
        <View style={styles.sosCallContainer}>
          <View style={styles.sosSpecialIconContainer}>
            <FireIcon />
          </View>
          <View style={styles.sosPhoneAndCallContainer}>
            <View>
              <Text style={styles.sosPhoneNumberText}>101 руу залгах</Text>
              <Text style={styles.sosDetailText}>Гал түймэр</Text>
            </View>
            <TouchableOpacity onPress={() => handleEmergencyCall('99038827')}>
              <PhoneCallIcon style={styles.sosPhoneIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sosCallContainer}>
          <View style={styles.sosSpecialIconContainer}>
            <PoliceIcon />
          </View>
          <View style={styles.sosPhoneAndCallContainer}>
            <View>
              <Text style={styles.sosPhoneNumberText}>102 луу залгах</Text>
              <Text style={styles.sosDetailText}>
                Гэмт хэрэг, зөрчил, зам тээвэр
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEmergencyCall('102')}>
              <PhoneCallIcon style={styles.sosPhoneIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sosCallContainer}>
          <View style={styles.sosSpecialIconContainer}>
            <AmbulanceIcon />
          </View>
          <View style={styles.sosPhoneAndCallContainer}>
            <View>
              <Text style={styles.sosPhoneNumberText}>103 руу залгах</Text>
              <Text style={styles.sosDetailText}>Эмнэлгийн түргэн тусламж</Text>
            </View>
            <TouchableOpacity onPress={() => handleEmergencyCall('103')}>
              <PhoneCallIcon style={styles.sosPhoneIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sosCallContainer}>
          <View style={styles.sosSpecialIconContainer}>
            <FiretruckIcon />
          </View>
          <View style={styles.sosPhoneAndCallContainer}>
            <View>
              <Text style={styles.sosPhoneNumberText}>104 руу залгах</Text>
              <Text style={styles.sosDetailText}>
                Гамшиг осол, аврах ажиллагаа
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleEmergencyCall('104')}>
              <PhoneCallIcon style={styles.sosPhoneIconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={navigateToContact}
        style={styles.sosPersonalInfo}
      >
        <FirstAidKitIcon />
        <Text
          numberOfLines={2}
          style={[styles.sosPhoneNumberText, styles.sosNavButton]}
        >
          Яаралтай үед ашиглах хувийн мэдээлэл
        </Text>
      </TouchableWithoutFeedback>
    </View>
  )
}
