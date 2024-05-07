import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, Animated, Easing } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import OutsidePressHandler from 'react-native-outside-press'

type ListItem = {
  label?: string
  icon?: React.ReactNode
  element?: React.ReactNode
  style?: object
  function: () => void
}
type MiniDropdownProps = {
  options: ListItem[]
  activator: React.ReactNode
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  position?: object
}

export const MiniDropdown: React.FC<MiniDropdownProps> = ({
  options,
  activator,
  visible,
  setVisible,
  position,
}) => {
  const { theme } = useTheme()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(-10)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: visible ? 0 : -10,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start()
  }, [visible, fadeAnim, translateYAnim])

  const toggleDropdown = () => {
    setVisible(prev => !prev)
  }

  const styles = StyleSheet.create({
    activatorContainer: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
      elevation: -1,
      justifyContent: 'center',
      position: 'relative',
      zIndex: -110,
    },
    divider: {
      backgroundColor: theme.border,
      height: 1,
      marginHorizontal: 12,
    },
    dropdownHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 48,
      justifyContent: 'space-between',
      padding: 16,
      zIndex: -1,
    },
    dropdownText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 13,
    },
    optionItem: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      gap: 10,
      marginTop: -1,
      padding: 16,
    },
    optionsContainer: {
      backgroundColor: theme.darkBg,
      borderRadius: 10,
      elevation: 10,
      opacity: fadeAnim,
      position: 'absolute',
      right: 10,
      top: 36,
      transform: [{ translateY: translateYAnim }],
      zIndex: 60,
      ...position,
    },
  })

  return (
    <>
      {visible && (
        <Animated.View style={styles.optionsContainer}>
          <OutsidePressHandler
            onOutsidePress={() => setTimeout(() => setVisible(false), 100)}
          >
            {options.map((item, i) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    item.function()
                    setTimeout(() => {
                      toggleDropdown()
                    }, 30)
                  }}
                  style={styles.optionItem}
                >
                  {item.icon && item.icon}
                  {item.label && (
                    <Text style={[styles.dropdownText, item.style]}>
                      {item.label}
                    </Text>
                  )}
                  {item.element && item.element}
                </TouchableOpacity>
                {i < options.length - 1 && <View style={styles.divider} />}
              </>
            ))}
          </OutsidePressHandler>
        </Animated.View>
      )}
      <View style={styles.activatorContainer}>
        <TouchableOpacity
          onPress={() => toggleDropdown()}
          style={styles.dropdownHeader}
        >
          {activator}
        </TouchableOpacity>
      </View>
    </>
  )
}
