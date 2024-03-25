import React, { useLayoutEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { getHeaderTitle } from '@react-navigation/elements'
import { useTheme } from '../../theme/theme-provider'
import { LeftArrowIcon } from '../../assets/icons/'
import { ParamListBase, Route } from '@react-navigation/native'
import {
  BottomTabNavigationOptions,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { SafeAreaView } from 'react-native-safe-area-context'

type CustomHeaderProps = {
  route: Route<string>
  navigation: BottomTabNavigationProp<ParamListBase>
  options: BottomTabNavigationOptions
  back?: boolean
  rightElement?: React.ReactNode
}

export const CustomTabHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  route,
  options,
  back,
  rightElement,
}) => {
  const { theme } = useTheme()
  const [title, setTitle] = useState('')

  const handlePress = () => {
    navigation.goBack()
  }

  useLayoutEffect(() => {
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
      borderBottomColor: theme.stroke,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    profile: {
      backgroundColor: theme.text,
      borderRadius: 16,
      height: 32,
      width: 32,
    },
  })

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.header}>
      <View>
        {back && (
          <TouchableOpacity onPress={handlePress}>
            <LeftArrowIcon style={styles.backButtonIcon} />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {rightElement ? rightElement : <View style={styles.profile} />}
    </SafeAreaView>
  )
}
