import React, { useLayoutEffect } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { RootSOSStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { EditIcon, PhoneCallIcon } from '../../assets/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

type SOSContactProps = {
  navigation: BottomTabNavigationProp<RootSOSStackParamList, 'Contact'>
}

export const SOSContact: React.FC<SOSContactProps> = ({ navigation }) => {
  const { theme } = useTheme()

  const handleEmergencyCall = (number: string) => {
    Linking.openURL('tel:' + number)
  }
  const headerEditButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('FixInfo')}>
        <EditIcon style={styles.headerIconStyle} />
      </TouchableOpacity>
    )
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerEditButton,
    })
  })

  const styles = StyleSheet.create({
    callIconStyle: {
      color: theme.text,
      height: 20,
      width: 20,
    },
    container: {
      backgroundColor: theme.bg,
      gap: 24,
      height: '100%',
      padding: 20,
      paddingBottom: 0,
    },
    divider: {
      backgroundColor: theme.border,
      flexGrow: 1,
      height: 1,
      marginHorizontal: 8,
    },
    emergencyInfoContainer: {
      backgroundColor: theme.lightBg,
      borderLeftColor: theme.red,
      borderLeftWidth: 10,
      borderRadius: 10,
      width: '100%',
    },
    emergencyInfoItem: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 13,
      paddingHorizontal: 20,
      width: '100%',
    },
    emergencySubText: {
      color: theme.darktext,
      fontFamily: theme.nunito700,
      fontSize: 12,
    },
    emergencySubTitle: {
      color: theme.darktext,
      fontSize: 12,
      fontWeight: '800',
    },
    emergencyText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 13,
    },
    emergencyTextContainer: {
      flexDirection: 'column',
    },
    emergencyTitle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 16,
    },
    headerIconStyle: {
      color: theme.iconBg,
    },
    pictureAndText: {
      flexDirection: 'row',
      gap: 8,
    },
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 15,
      height: 30,
      width: 30,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.emergencyInfoContainer}>
        <View style={styles.emergencyInfoItem}>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Гэр бүлийн хүмүүс</Text>
            <Text style={styles.emergencySubTitle}>
              Яаралтай үеийн хувийн мэдээлэл
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>Эхнэр</Text>
              <Text style={styles.emergencySubText}>Н. Маралгуа</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleEmergencyCall('88889999')}>
            <PhoneCallIcon style={styles.callIconStyle} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>Ээж</Text>
              <Text style={styles.emergencySubText}>Н. Маралгуа</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleEmergencyCall('88889999')}>
            <PhoneCallIcon style={styles.callIconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.emergencyInfoContainer}>
        <View style={styles.emergencyInfoItem}>
          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Анхны тусламж</Text>
            <Text style={styles.emergencySubTitle}>
              Яаралтай үеийн хувийн мэдээлэл
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>Нэр</Text>
              <Text style={styles.emergencySubText}>Н. Маралгуа</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>Цусний бүлэг</Text>
              <Text style={styles.emergencySubText}>А буюу || бүлэг</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>
                Харшилдаг эм бэлдмэл, зүйл
              </Text>
              <Text style={styles.emergencySubText}>Мэдээлэл оруулаагүй</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.emergencyInfoItem}>
          <View style={styles.pictureAndText}>
            <View style={styles.profilePicture} />
            <View style={styles.emergencyTextContainer}>
              <Text style={styles.emergencyText}>Тогтмол уудаг эм</Text>
              <Text style={styles.emergencySubText}>Мэдээлэл оруулаагүй</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
