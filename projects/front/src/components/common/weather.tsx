//TODO seperate it for ios and android & write a function that gets weather information from weather service

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { SunIcon } from '../../assets/icons'

type WeatherProps = {
  style?: object
}

export const Weather: React.FC<WeatherProps> = () => {
  const { theme } = useTheme()

  const getDateInfo = () => {
    const currentDate = new Date()
    let text = ''
    switch (currentDate.getDay()) {
      case 1:
        text += 'Даваа'
        break
      case 2:
        text += 'Мягмар'
        break
      case 3:
        text += 'Лxагва'
        break
      case 4:
        text += 'Пүрэв'
        break
      case 5:
        text += 'Баасан'
        break
      case 6:
        text += 'Бямба'
        break
      case 0:
        text += 'Ням'
        break
    }
    text +=
      ' гариг, ' +
      (currentDate.getMonth() + 1) +
      ' сарын ' +
      currentDate.getDate() +
      ' ' +
      currentDate.getFullYear()
    return text
  }

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderRadius: 20,
      flexDirection: 'row',
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 14,
      width: '100%',
    },
    dateText: {
      color: theme.darktext,
      fontFamily: theme.commi700,
      fontSize: 10,
    },
    temperatureText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    textContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    weatherIconContainer: {
      backgroundColor: theme.text,
      borderRadius: 100,
      padding: 12,
    },
    weatherIconStyle: {
      color: theme.stroke,
    },
    weatherText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 14,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.weatherIconContainer}>
        <SunIcon style={styles.weatherIconStyle} />
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.dateText}>{getDateInfo()}</Text>
          <Text style={styles.weatherText}>Нарлаг, салхи багатай</Text>
        </View>
        <Text style={styles.temperatureText}> 18°C </Text>
      </View>
    </View>
  )
}
