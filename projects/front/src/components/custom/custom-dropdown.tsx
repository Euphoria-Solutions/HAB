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
  label?: string
  onSelect: (_v: DropdownOption) => void
  position?: 'above' | 'below'
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  value = { value: '', label: 'Мэдээлэл оруулах' },
  placeholder,
  label,
  onSelect,
  position = 'below',
}) => {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(
    new Animated.Value(position == 'below' ? -10 : 10)
  ).current
  const arrowRotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: isVisible ? 0 : position == 'below' ? -10 : 10,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(arrowRotation, {
        toValue: isVisible ? (position == 'below' ? 1 : -1) : 0,
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
    inputRange: [-1, 1],
    outputRange: ['-90deg', '90deg'],
  })

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: theme.border,
      height: 1,
      width: '100%',
    },
    dropDownText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: 'bold',
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
    label: {
      color: theme.darktext,
      fontSize: 14,
      fontWeight: '800',
      height: 20,
      marginBottom: 10,
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
      bottom: position != 'below' ? 60 : null,
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: position == 'below' ? 86 : null,
      zIndex: 10,
    },
  })

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
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

      {isVisible && (
        <Animated.View
          style={[
            styles.optionsContainer,
            { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          {options.map((item, i) => (
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
      )}
    </View>
  )
}
