// CustomHeader.tsx
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { useTheme } from '../../theme/theme-provider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LeftArrowIcon } from '../../assets/icons/left-arrow-icon'
import { ParamListBase, Route } from '@react-navigation/native'

type CustomHeaderProps = {
  route: Route<string>
  navigation: StackNavigationProp<ParamListBase>
  options: StackNavigationOptions
  back?: { title: string }
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
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
  }, [route])

  const styles = StyleSheet.create({
    backButtonIcon: {
      alignSelf: 'flex-start',
      color: theme.iconBg,
      padding: 10,
    },
    header: {
      alignItems: 'center',
      backgroundColor: theme.bg,
      flexDirection: 'row',
      justifyContent: back ? 'space-between' : 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
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
    <SafeAreaView style={styles.header}>
      {back && (
        <TouchableOpacity onPress={handlePress}>
          <LeftArrowIcon style={styles.backButtonIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
      <LeftArrowIcon style={styles.hiddenIcon} />
    </SafeAreaView>
  )
}

export default CustomHeader
