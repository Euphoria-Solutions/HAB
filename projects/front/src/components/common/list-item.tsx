import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { RightArrowIcon } from '../../assets/icons'

interface ListProps {
  title: string
  titleIcon?: React.ReactNode
  titleStyle?: object
  onPress?: () => void
  disabled?: boolean
  content: React.ReactNode | 'default' | 'none'
}

export const ListItem: React.FC<ListProps> = ({
  title,
  titleIcon,
  titleStyle,
  onPress,
  disabled = false,
  content = 'default',
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      paddingRight: 20,
    },
    content: {
      alignItems: 'flex-end',
      flex: 1,
      justifyContent: 'center',
    },
    righArrowIconStyle: {
      color: theme.iconBg,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      minWidth: '40%',
    },
    titleStyle: {
      color: theme.darktext,
      fontSize: 14,
      fontWeight: '800',
    },
  })

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        {titleIcon && titleIcon}
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.content}>
        {content != 'none' &&
          (content == 'default' ? (
            <RightArrowIcon style={styles.righArrowIconStyle} />
          ) : (
            content
          ))}
      </View>
    </TouchableOpacity>
  )
}
