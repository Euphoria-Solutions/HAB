import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack'
import React, { useLayoutEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
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
  centerTitle?: boolean
}

export const CustomStackHeader: React.FC<CustomHeaderProps> = ({
  navigation,
  route,
  options,
  back,
  centerTitle = true,
}) => {
  const { theme } = useTheme()
  const [title, setTitle] = useState('')

  const handlePress = () => {
    navigation.goBack()
  }

  const backIcon = (statement: boolean | undefined) => {
    return statement ? (
      options.headerLeft ? (
        options.headerLeft({})
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <LeftArrowIcon style={styles.backButtonIcon} />
        </TouchableOpacity>
      )
    ) : (
      <></>
    )
  }

  useLayoutEffect(() => {
    if (route) {
      setTitle(options.title ?? getHeaderTitle(options, route.name))
    }
  }, [route.name, options])

  const styles = StyleSheet.create({
    backButtonIcon: {
      alignSelf: 'flex-start',
      color: theme.iconBg,
      padding: 10,
    },
    center: {
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
      gap: 14,
      height: '100%',
      justifyContent: centerTitle ? 'center' : 'flex-start',
      paddingHorizontal: 20,
      position: 'absolute',
      width: '100%',
      zIndex: !centerTitle ? 100 : 20,
    },
    header: {
      backgroundColor: theme.bg,
      borderBottomColor: theme.stroke,
      borderBottomWidth: 1,
      width: '100%',
    },
    headerText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    hiddenIcon: {
      display: back ? 'flex' : 'none',
      opacity: 0,
      padding: 10,
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: centerTitle ? 'space-between' : 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 16,
      width: '100%',
      zIndex: centerTitle ? 100 : 20,
    },
  })

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.header}>
      <View style={styles.center}>
        {backIcon(back && !centerTitle)}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.subContainer}>
        {backIcon(back && centerTitle)}
        {options.headerRight ? (
          options.headerRight({})
        ) : (
          <LeftArrowIcon style={styles.hiddenIcon} />
        )}
      </View>
    </SafeAreaView>
  )
}
