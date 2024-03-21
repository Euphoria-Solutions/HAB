import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  DimensionValue,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { RightArrowIcon } from '../../assets/icons'

export interface ListProps {
  title: string | React.ReactNode
  titleIcon?: React.ReactNode
  titleStyle?: object
  onPress?: () => void
  disabled?: boolean
  content: React.ReactNode | 'default' | 'none' | string
  contentStyle?: object
  contentMaxWidth?: DimensionValue
  contentMinWidth?: DimensionValue
}

export const ListItem: React.FC<ListProps> = ({
  title,
  titleIcon,
  titleStyle,
  onPress,
  disabled = false,
  content = 'default',
  contentStyle,
  contentMaxWidth = '50%',
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      paddingRight: 20,
      zIndex: 0,
    },
    content: {
      alignItems: 'flex-end',
      flex: 1,
      justifyContent: 'center',
    },
    contentStyle: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '700',
    },
    righArrowIconStyle: {
      color: theme.iconBg,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      width: contentMaxWidth,
    },
    titleStyle: {
      color: theme.darktext,
      fontSize: 12,
      fontWeight: '700',
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
        {typeof title == 'string' ? (
          <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
        ) : (
          title
        )}
      </View>
      <View style={styles.content}>
        {content != 'none' &&
          (content == 'default' ? (
            <RightArrowIcon style={styles.righArrowIconStyle} />
          ) : typeof content == 'string' ? (
            <Text style={contentStyle ? contentStyle : styles.contentStyle}>
              {content}
            </Text>
          ) : (
            content
          ))}
      </View>
    </TouchableOpacity>
  )
}
