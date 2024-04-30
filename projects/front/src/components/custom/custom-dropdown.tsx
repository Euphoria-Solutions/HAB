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
  icon?: React.ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  value: DropdownOption | string
  placeholder?: string
  label?: string
  onSelect: (_v: DropdownOption) => void
  position?: 'above' | 'below'
  zIndex?: number
}

export const CustomDropdown: React.FC<DropdownProps> = ({
  options,
  value: defaultValue,
  placeholder,
  label,
  onSelect,
  position = 'below',
  zIndex,
}) => {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(
    new Animated.Value(position == 'below' ? -10 : 10)
  ).current
  const arrowRotation = useRef(new Animated.Value(0)).current
  const [value, setValue] = useState<DropdownOption | undefined>()

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
  useEffect(() => {
    if (defaultValue) {
      if (typeof defaultValue == 'string') {
        setValue(options.find(e => e.value == defaultValue))
      } else {
        setValue(defaultValue)
      }
    } else {
      setValue({
        value: '',
        label: 'Мэдээлэл оруулах',
      })
    }
  }, [defaultValue])

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
      backgroundColor: theme.lightBg,
      height: 1,
      marginHorizontal: 16,
    },
    dropDownText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 14,
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
      fontFamily: theme.commi700,
      fontSize: 15,
    },
    iconStyle: {
      color: theme.text,
    },
    label: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 14,
      height: 20,
      marginBottom: 10,
      zIndex: -1,
    },
    optionItem: {
      flexDirection: 'row',
      gap: 10,
      marginTop: -1,
      padding: 16,
    },
    optionsContainer: {
      backgroundColor: theme.darkBg,
      borderRadius: 10,
      bottom: position != 'below' ? 60 : null,
      flex: 1,
      left: 0,
      position: 'absolute',
      right: 0,
      top: position == 'below' ? (label ? 86 : 60) : null,
      zIndex: 100,
    },
    zIndexStyle: {
      zIndex: zIndex,
    },
  })

  return (
    <View style={styles.zIndexStyle}>
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
                {item.icon ?? null}
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
