// CustomHeader.tsx
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
      borderBottomColor: theme.stroke,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: !centerTitle
        ? 'space-between'
        : back
          ? 'space-between'
          : 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerAndIcon: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 14,
    },
    headerText: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '800',
    },
    hiddenIcon: {
      display: back ? 'flex' : 'none',
      opacity: 0,
      padding: 10,
    },
  })

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.header}>
      {backIcon(back && centerTitle)}
      <View style={styles.headerAndIcon}>
        {backIcon(back && !centerTitle)}
        <Text style={styles.headerText}>{title}</Text>
      </View>
      {options.headerRight ? (
        options.headerRight({})
      ) : (
        <LeftArrowIcon style={styles.hiddenIcon} />
      )}
    </SafeAreaView>
  )
}
