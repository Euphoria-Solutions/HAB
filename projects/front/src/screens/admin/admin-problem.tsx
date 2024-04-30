import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView } from 'react-native-gesture-handler'
import { ScheduleType, scheduleData } from '../../utils'
import { EventProvider } from 'react-native-outside-press'

interface IAdminProblem {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Problems'>
}

export const AdminProblem: React.FC<IAdminProblem> = () => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<ScheduleType[]>([])

  useEffect(() => {
    if (scheduleData) {
      if (searchValue) {
        const tempVal = searchValue.toLowerCase()
        setData(
          scheduleData.filter(e => {
            if (e.license.toLowerCase().includes(tempVal)) {
              return true
            }
            return false
          })
        )
      } else {
        setData(scheduleData)
      }
      setData(prev => prev.filter(e => e.state == 'failed'))
    }
  }, [scheduleData, searchValue])

  const displayDate = (date: Date) => {
    let temp = ''

    temp += date.getFullYear()
    temp += '.'
    temp += date.getMonth() + 1
    temp += '.'
    temp += date.getDate()

    return temp
  }

  const showItems = () => {
    return data.map(e => {
      return {
        title: (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.nameStyle}>Гэрээний дугаар: {e.license}</Text>
              <Text style={styles.jobStyle}>
                Автомашины дугаар: {e.carNumber}
              </Text>
            </View>
          </View>
        ),
        content: (
          <Text style={styles.listContentStyle}>{displayDate(e.date)}</Text>
        ),
      }
    })
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
    },
    contentStyle: {
      gap: 12,
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    inputContainer: {
      flexDirection: 'row',
      gap: 10,
      width: '100%',
    },
    jobStyle: {
      color: theme.darktext,
      fontFamily: theme.commi700,
      fontSize: 10,
    },
    listContainerStyle: {
      borderRadius: 20,
      borderWidth: 0,
    },
    listContentStyle: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 10,
    },
    listItem: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    nameStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
  })

  return (
    <EventProvider>
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        style={styles.container}
      >
        <View style={styles.inputContainer}>
          <SearchInput value={searchValue} setValue={setSearchValue} />
        </View>
        <ListContainer
          style={styles.listContainerStyle}
          itemOptions={{ allDisabled: true, maxWidth: '75%' }}
          items={showItems()}
        />
      </ScrollView>
    </EventProvider>
  )
}
