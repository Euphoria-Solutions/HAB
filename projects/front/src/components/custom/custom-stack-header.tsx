// CustomHeader.tsx
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { useTheme } from '../../theme/theme-provider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LeftArrowIcon } from '../../assets/icons/'
import { ParamListBase, Route } from '@react-navigation/native'

type CustomHeaderProps = {
  route: Route<string>
  navigation: StackNavigationProp<ParamListBase>
  options: StackNavigationOptions
  back?: { title: string }
}

export const CustomStackHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const { theme } = useTheme()
  const [title, setTitle] = useState('')

  const handlePress = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (route) {
      setTitle(getHeaderTitle(options, route.name))
    }
  }, [route.name])

  const styles = StyleSheet.create({
    backButtonIcon: {
      alignSelf: 'flex-start',
      color: theme.iconBg,
      padding: 10,
    },
    header: {
      alignItems: 'center',
      backgroundColor: theme.bg,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: back ? 'space-between' : 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: 'bold',
    },
    hiddenIcon: {
      display: back ? 'flex' : 'none',
      opacity: 0,
      padding: 10,
    },
  })

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.header}>
      {back && (
        <TouchableOpacity onPress={handlePress}>
          <LeftArrowIcon style={styles.backButtonIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
      {options.headerRight ? (
        options.headerRight({})
      ) : (
        <LeftArrowIcon style={styles.hiddenIcon} />
      )}
    </SafeAreaView>
  )
}
