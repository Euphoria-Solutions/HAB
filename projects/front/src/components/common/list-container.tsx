import React from 'react'
import { DimensionValue, StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { ListItem, ListProps } from './list-item'

type ItemOptions = {
  maxWidth?: DimensionValue
  allDisabled?: boolean
  allTitleStyle?: object
  allContentStyle?: object
}

type ListContainerProps = {
  items: ListProps[]
  itemOptions?: ItemOptions
  style?: object
}

export const ListContainer: React.FC<ListContainerProps> = ({
  items,
  style,
  itemOptions,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      display: items && items.length > 0 ? 'flex' : 'none',
      width: '100%',
    },
    divider: {
      backgroundColor: theme.border,
      height: 1,
      marginHorizontal: 16,
      zIndex: -100,
    },
  })

  if (!items) {
    return null
  }

  return (
    <View style={[styles.container, style]}>
      {items &&
        items.map((e, i) => {
          return (
            <>
              <ListItem
                index={i}
                key={i}
                content={e.content}
                title={e.title}
                disabled={
                  typeof e.disabled == 'boolean'
                    ? e.disabled
                    : itemOptions?.allDisabled && true
                }
                onPress={e.onPress}
                titleIcon={e.titleIcon}
                titleStyle={
                  e.titleStyle
                    ? e.titleStyle
                    : itemOptions?.allTitleStyle && itemOptions.allTitleStyle
                }
                contentStyle={
                  e.contentStyle
                    ? e.contentStyle
                    : itemOptions?.allContentStyle &&
                      itemOptions.allContentStyle
                }
                contentMaxWidth={itemOptions?.maxWidth && itemOptions.maxWidth}
              />
              {items && i + 1 < items.length && <View style={styles.divider} />}
            </>
          )
        })}
    </View>
  )
}
