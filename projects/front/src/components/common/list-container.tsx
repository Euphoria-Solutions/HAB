import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'

type ListContainerProps = {
  children: React.ReactNode[] | React.ReactNode
  style?: object
}

export const ListContainer: React.FC<ListContainerProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      display:
        Array.isArray(children) && children.length > 0 && children
          ? 'flex'
          : 'none',
      width: '100%',
    },
    divider: {
      backgroundColor: theme.border,
      height: 1,
      marginHorizontal: 16,
    },
  })

  return (
    <View style={[styles.container, style]}>
      {Array.isArray(children)
        ? children?.map((e, i) => {
            return (
              <View key={i}>
                {e}
                {i + 1 < children.length && <View style={styles.divider} />}
              </View>
            )
          })
        : children}
    </View>
  )
}
