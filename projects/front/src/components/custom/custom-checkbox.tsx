import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Animated, StyleSheet, DimensionValue } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'

type CheckboxProps = {
  checked?: boolean
  setChecked?: Dispatch<SetStateAction<boolean>>
  onChange?: () => void
  showIcon?: boolean
  shape?: 'square' | 'circle'
  activeColor?: string
  inActiveColor?: string
  size?: DimensionValue
  disabled?: boolean
}

export const CustomCheckbox: React.FC<CheckboxProps> = ({
  checked = false,
  setChecked,
  onChange,
  activeColor,
  inActiveColor,
  shape = 'square',
  size = 20,
  disabled = false,
}) => {
  const { theme } = useTheme()
  const [value, setValue] = useState(checked)
  const opacityValue = new Animated.Value(value ? 1 : 0)

  useEffect(() => {
    setValue(checked)
  }, [checked])

  const toggleCheckbox = () => {
    Animated.timing(opacityValue, {
      toValue: value ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      setValue(!value)
      setChecked && setChecked(prev => !prev)
      onChange && onChange()
    })
  }

  const color = opacityValue.interpolate({
    inputRange: [0, 1],
    outputRange: [
      inActiveColor ? inActiveColor : theme.darktext,
      activeColor ? activeColor : theme.primary,
    ],
  })

  const styles = StyleSheet.create({
    checkbox: {
      alignItems: 'center',
      backgroundColor: color,
      borderRadius: shape == 'square' ? 3 : 100,
      height: '100%',
      justifyContent: 'center',
      opacity: opacityValue,
      width: '100%',
    },
    checkboxContainer: {
      alignItems: 'center',
      borderColor: color,
      borderRadius: shape == 'square' ? 5 : 100,
      borderWidth: 2,
      height: size,
      justifyContent: 'center',
      padding: 2,
      width: size,
    },
  })

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={toggleCheckbox}
    >
      <Animated.View style={styles.checkboxContainer}>
        <Animated.View style={styles.checkbox}></Animated.View>
      </Animated.View>
    </TouchableOpacity>
  )
}
