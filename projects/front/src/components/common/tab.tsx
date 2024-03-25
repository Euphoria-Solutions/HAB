import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTheme } from '../../theme/theme-provider'

type TabTypes = {
  onTabChange?: (_v: number) => void
  allTabs: string[]
  tab: number
  setTab: (_v: number) => void
}

export const Tab: React.FC<TabTypes> = ({
  onTabChange,
  allTabs,
  tab,
  setTab,
}) => {
  const { theme } = useTheme()

  const handleTabChange = (t: number) => {
    onTabChange && onTabChange(t)
    setTab(t)
  }

  const styles = StyleSheet.create({
    tabButton: {
      flex: 1,
      flexDirection: 'column',
    },
    tabButtonContainer: {
      flexDirection: 'row',
      gap: 8,
      width: '100%',
    },
    tabButtonText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 12,
    },
    tabButtonTouchable: {
      alignItems: 'center',
      borderRadius: 10,
      height: 36,
      justifyContent: 'center',
      width: '100%',
    },
  })

  return (
    <View style={styles.tabButtonContainer}>
      {allTabs.map((e, i) => (
        <View key={i} style={styles.tabButton}>
          <TouchableOpacity
            style={[
              styles.tabButtonTouchable,
              { backgroundColor: tab == i ? theme.primary : theme.lightBg },
            ]}
            onPress={() => handleTabChange(i)}
          >
            <Text style={styles.tabButtonText}>{e}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}
