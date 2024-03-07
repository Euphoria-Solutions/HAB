import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { LocationIcon } from '../../assets/icons/'
import { TouchableOpacity } from 'react-native-gesture-handler'

type CarDetailType = {
  carNumber: string
  state: 'waiting' | 'being processed' | 'finished'
  date: Date
  progress: string
  id: string
  location: string
  driver: string
  profilePicture?: string
  onPress: () => void
}

export const CarDetail: React.FC<CarDetailType> = ({
  carNumber,
  state: preState,
  date,
  progress,
  id,
  location,
  driver,
  onPress,
  profilePicture,
}) => {
  const { theme } = useTheme()
  const [state, setState] = useState('')
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    let tempDate = ''

    tempDate += date.getFullYear()
    tempDate += ' оны '
    tempDate += date.getMonth() + 1
    tempDate += ' сарын '
    tempDate += date.getDate()
    tempDate += 'нд '
    tempDate += date.getHours()
    tempDate += ':'
    tempDate += date.getMinutes()

    setDateString(tempDate)
  }, [date])

  useEffect(() => {
    if (preState) {
      if (preState == 'finished') setState('Дууссан')
      if (preState == 'being processed') setState('Хийгдэж Байна')
      if (preState == 'waiting') setState('Хүлээгдэж Байна')
    }
  }, [preState])

  const styles = StyleSheet.create({
    carNumberStyle: {
      color: theme.text,
      fontSize: 13,
      fontWeight: '900',
    },
    carTextStyle: {
      color: theme.text,
      fontSize: 13,
      fontWeight: 'bold',
    },
    container: {
      borderRadius: 10,
      overflow: 'hidden',
    },
    divider: {
      backgroundColor: theme.blue700,
      height: 2,
      width: '100%',
    },
    driverContainer: {
      alignItems: 'center',
      backgroundColor: theme.primary,
      flexDirection: 'row',
      gap: 5,
      justifyContent: 'center',
      paddingBottom: 8,
      paddingTop: 6,
    },
    driverProfilePicture: {
      backgroundColor: theme.text,
      borderRadius: 10,
      height: 20,
      width: 20,
    },
    driverText: {
      color: theme.text,
      fontSize: 12,
      fontWeight: 'bold',
    },
    icon: {
      color: theme.text,
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      width: '100%',
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: theme.loginText,
      borderRadius: 7,
      height: 14,
      justifyContent: 'center',
      width: 14,
    },
    idStyle: {
      color: theme.text,
      fontSize: 12,
      fontWeight: 'bold',
      width: '100%',
    },
    infoContainer: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      gap: 8,
      padding: 20,
    },
    progressStyle: {
      color: theme.text,
      fontSize: 10,
      fontWeight: 'bold',
    },
    stateAndProgress: {
      alignItems: 'flex-end',
      gap: 6,
    },
    stateContainer: {
      backgroundColor:
        preState == 'finished'
          ? theme.green
          : preState == 'being processed'
            ? theme.yellow
            : theme.red,
      borderRadius: 4,
      minWidth: 86,
      padding: 3,
    },
    stateText: {
      color: theme.white,
      fontSize: 10,
      fontWeight: 'bold',
      justifyContent: 'center',
      textAlign: 'center',
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'flex-start',
      width: '100%',
    },
    textStyles: {
      color: theme.darktext,
      fontSize: 10,
      fontWeight: 'bold',
      maxWidth: '75%',
    },
    topSectionStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  })

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.topSectionStyle}>
          <Text style={styles.carTextStyle}>
            Машины дугаар:{' '}
            <Text style={styles.carNumberStyle}>{carNumber}</Text>
          </Text>
          <View style={styles.stateAndProgress}>
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>{state}</Text>
            </View>
            <Text style={styles.progressStyle}>{progress} хийсэн</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>Э</Text>
          </View>
          <Text style={styles.textStyles}>{dateString}</Text>
        </View>
        <Text style={styles.idStyle}>Гэрээний дугаар: {id}</Text>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <LocationIcon style={styles.icon} />
          </View>
          <Text style={styles.textStyles}>{location}</Text>
        </View>
      </View>
      <View style={styles.driverContainer}>
        <View style={styles.driverProfilePicture}>
          <Image src={profilePicture} />
        </View>
        <Text style={styles.driverText}>
          {driver ? driver : 'Жолооч тодорхой бус'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
