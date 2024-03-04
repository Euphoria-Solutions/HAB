import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { useTheme } from '../../theme/theme-provider'

interface CustomSwitchProps {
  value: boolean
  setValue: (_v: boolean) => void
  onToggle?: () => void
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  setValue,
  onToggle,
}) => {
  const { theme } = useTheme()
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0))

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [value])

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15], // Adjust the distance of the switch head
  })
  const handleToggle = () => {
    setValue(!value)
    onToggle && onToggle()
  }

  const styles = StyleSheet.create({
    switchContainer: {
      backgroundColor: value ? theme.primary : theme.blue700,
      borderRadius: 23,
      padding: 2,
      width: 41,
    },
    thumb: {
      backgroundColor: theme.text,
      borderRadius: 11,
      height: 22,
      transform: [{ translateX }],
      width: 22,
    },
  })

  return (
    <TouchableOpacity onPress={handleToggle}>
      <View style={styles.switchContainer}>
        <Animated.View style={styles.thumb} />
      </View>
    </TouchableOpacity>
  )
}
