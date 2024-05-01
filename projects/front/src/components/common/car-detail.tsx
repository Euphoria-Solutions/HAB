import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { LocationIcon } from '../../assets/icons/'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DataType } from '../../utils'

type CarDetailType = {
  profilePicture?: string
  onPress: () => void
  data: DataType
}

export const CarDetail: React.FC<CarDetailType> = ({
  data,
  onPress,
  profilePicture,
}) => {
  const { theme } = useTheme()
  const [state, setState] = useState('')
  const [dateString, setDateString] = useState('')

  useEffect(() => {
    let tempDate = ''

    tempDate += data.date.getFullYear()
    tempDate += ' оны '
    tempDate += data.date.getMonth() + 1
    tempDate += ' сарын '
    tempDate += data.date.getDate()
    tempDate += 'нд '
    tempDate += data.date.getHours()
    tempDate += ':'
    tempDate += data.date.getMinutes()

    setDateString(tempDate)

    if (data.state) {
      if (data.state == 'finished') setState('Дууссан')
      if (data.state == 'being processed') setState('Хийгдэж Байна')
      if (data.state == 'waiting') setState('Хүлээгдэж Байна')
    }
  }, [data])

  const styles = StyleSheet.create({
    carNumberStyle: {
      color: theme.text,
      fontFamily: theme.commi800,
      fontSize: 13,
    },
    carTextStyle: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 13,
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
      fontFamily: theme.commi700,
      fontSize: 12,
    },
    icon: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 10,
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
    infoContainer: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      gap: 8,
      padding: 20,
    },
    progressStyle: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 10,
    },
    stateAndProgress: {
      alignItems: 'flex-end',
      gap: 6,
    },
    stateContainer: {
      backgroundColor:
        data.state == 'finished'
          ? theme.green
          : data.state == 'being processed'
            ? theme.yellow
            : theme.red,
      borderRadius: 4,
      minWidth: 86,
      padding: 3,
    },
    stateText: {
      color: theme.white,
      fontFamily: theme.commi700,
      fontSize: 10,
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
      fontFamily: theme.commi700,
      fontSize: 10,
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
            <Text style={styles.carNumberStyle}>{data.carNumber}</Text>
          </Text>
          <View style={styles.stateAndProgress}>
            <View style={styles.stateContainer}>
              <Text style={styles.stateText}>{state}</Text>
            </View>
            <Text style={styles.progressStyle}>{data.progress} хийсэн</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={styles.driverText}>
            Чиргүүлийн дугаар: {data.trailerNumber} | {data.trailerNumber2}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>Э</Text>
          </View>
          <Text style={styles.textStyles}>{dateString}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.iconContainer}>
            <LocationIcon style={styles.icon} />
          </View>
          <Text style={styles.textStyles}>{data.location}</Text>
        </View>
      </View>
      <View style={styles.driverContainer}>
        <View style={styles.driverProfilePicture}>
          <Image src={profilePicture} />
        </View>
        <Text style={styles.driverText}>
          {data.driver ? data.driver : 'Жолооч тодорхой бус'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
