import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'

type SOSCallButtonProps = {
  children: React.ReactNode[] | React.ReactNode
  style?: object
}

export const SOSCallButton: React.FC<SOSCallButtonProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      height: 72,
      justifyContent: 'space-between',
      width: '100%',
    },
  })

  return <View style={[styles.container, style]}>{children}</View>
}
