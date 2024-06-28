import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from '../../theme/theme-provider'
import { CustomCheckbox } from '../custom'

type SelectionType = {
  title?: string
  icon?: React.ReactNode
  value: string
}

type RadioSelectionTypes = {
  title: string
  values: SelectionType[]
  selected: number
  setSelected: (_value: number) => void
}

export const RadioSelection: React.FC<RadioSelectionTypes> = ({
  title,
  values,
  selected,
  setSelected,
}) => {
  const { theme } = useTheme()

  const handleChange = (e: number) => {
    if (e == selected) {
      setSelected(-1)
    } else {
      setSelected(e)
    }
  }

  const styles = StyleSheet.create({
    container: {
      gap: 8,
    },
    itemContainer: {
      backgroundColor: theme.lightBg,
      borderRadius: 12,
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      width: '100%',
    },
    itemTitle: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '800',
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 16,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
  })

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {values &&
        values.map((e, i) => (
          <TouchableOpacity
            onPress={() => handleChange(i)}
            key={i}
            style={styles.itemContainer}
          >
            <View style={styles.titleContainer}>
              {e.icon && e.icon}
              <Text style={styles.itemTitle}>
                {e.title ? e.title : e.value}
              </Text>
            </View>
            <CustomCheckbox disabled checked={selected == i} shape='circle' />
          </TouchableOpacity>
        ))}
    </View>
  )
}
