import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { RightArrowIcon } from '../../assets/icons'

interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: DropdownOption
  placeholder?: string
  onSelect: (_v: DropdownOption) => void
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  value = { value: '', label: 'Мэдээлэл оруулах' },
  placeholder,
  onSelect,
}) => {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(-10)).current
  const arrowRotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    console.log(rotate)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: isVisible ? 0 : -10,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(arrowRotation, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isVisible, fadeAnim, translateYAnim, arrowRotation])

  const toggleDropdown = () => {
    setIsVisible(prev => !prev)
  }
  const handleOptionPress = (value: DropdownOption) => {
    onSelect(value)
    toggleDropdown()
  }

  const rotate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  })

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: theme.border,
      height: 1,
      width: '100%',
    },
    dropDownText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: 'bold',
    },
    dropdownContainer: {
      flex: 1,
      position: 'relative',
      zIndex: 10,
    },
    dropdownHeader: {
      backgroundColor: theme.lightBg,
      borderColor: isVisible ? theme.border : theme.lightBg,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
    },
    dropdownPlaceholder: {
      color: theme.iconBg,
      fontSize: 15,
      fontWeight: 'bold',
    },
    iconStyle: {
      color: theme.text,
    },
    optionItem: {
      marginTop: -1,
      padding: 16,
    },
    optionsContainer: {
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 56,
      zIndex: 2,
    },
  })

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        {value == null || value.value == '' ? (
          <Text style={styles.dropdownPlaceholder}>{placeholder}</Text>
        ) : (
          <Text style={styles.dropDownText}>{value.label}</Text>
        )}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <RightArrowIcon style={styles.iconStyle} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.optionsContainer,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        {isVisible &&
          options.map((item, i) => (
            <>
              <TouchableOpacity
                key={item.value}
                onPress={() => handleOptionPress(item)}
                style={styles.optionItem}
              >
                <Text style={styles.dropDownText}>{item.label}</Text>
              </TouchableOpacity>
              {i < options.length - 1 && (
                <View key={i} style={styles.divider} />
              )}
            </>
          ))}
      </Animated.View>
    </View>
  )
}
