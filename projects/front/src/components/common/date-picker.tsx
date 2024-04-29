import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DatePicker from 'react-native-date-picker'
import { RightArrowIcon } from '../../assets/icons'

type DatePickType = {
  label?: string
  value: Date | undefined
  setValue: React.Dispatch<React.SetStateAction<Date | undefined>>
  style?: object
}

export const DatePick: React.FC<DatePickType> = ({
  label,
  value,
  setValue,
}) => {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)

  const translateDate = () => {
    if (value) {
      let tempDate = ''

      tempDate += value.getFullYear()
      tempDate += ' оны '
      tempDate += value.getMonth() + 1
      tempDate += ' сарын '
      tempDate += value.getDate()

      return tempDate
    }
  }

  const styles = StyleSheet.create({
    container: {
      gap: 10,
    },
    datePicker: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderColor: theme.lightBg,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      width: '100%',
    },
    iconStyle: {
      color: theme.iconBg,
    },
    label: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    textStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
  })

  return (
    <View style={styles.container}>
      <DatePicker
        modal
        mode='date'
        locale='mn'
        open={open}
        date={value ?? new Date()}
        onConfirm={date => {
          setValue(date)
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.datePicker}>
        <Text style={styles.textStyle}>{translateDate() ?? ' '}</Text>
        <RightArrowIcon style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  )
}
