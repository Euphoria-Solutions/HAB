import { StyleSheet, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useTheme } from '../../theme/theme-provider'
import { ListContainer } from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { carReasonData } from '../../utils'
import { RootWorkStackParamList } from '../../navigation'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

type WorkPartsType = {
  navigation: BottomTabNavigationProp<RootWorkStackParamList, 'Parts'>
}

export const WorkParts: React.FC<WorkPartsType> = ({ navigation }) => {
  const { theme } = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null,
    })
  })

  const getItems = () => {
    const parts: { title: string; content: 'none' }[] = []
    carReasonData.problems.map(e => {
      return e.parts.map(el => {
        parts.push({ title: el.label, content: 'none' })
      })
    })
    return parts
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      justifyContent: 'space-between',
    },
    contentContainer: {
      gap: 12,
      padding: 20,
    },
    text: {
      color: theme.text,
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <ListContainer
          itemOptions={{ maxWidth: '100%', allTitleStyle: styles.text }}
          items={getItems()}
        />
      </ScrollView>
    </View>
  )
}
