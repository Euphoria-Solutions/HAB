// CustomBottomTabBar.tsx
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTheme } from '../../theme/theme-provider'

export const CustomBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      flexDirection: 'row',
      height: 100,
      justifyContent: 'space-evenly',
    },
    tabButton: {
      alignItems: 'center',
      flex: 1,
      gap: 4,
      justifyContent: 'center',
      paddingTop: 14,
    },
    tabText: {
      fontSize: 12,
      fontWeight: '600',
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            style={styles.tabButton}
            onPress={onPress}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? theme.text : theme.iconBg,
                size: 20,
              })}
            <Text
              style={[
                styles.tabText,
                { color: isFocused ? theme.text : theme.iconBg },
              ]}
            >
              {options.title ? options.title : route.name}
            </Text>
          </TouchableOpacity>
        )
      })}
    </SafeAreaView>
  )
}
