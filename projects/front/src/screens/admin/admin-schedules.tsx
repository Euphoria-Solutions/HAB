import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ScheduleType, scheduleData } from '../../utils'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'

interface IAdminSchedules {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Schedule'>
}

export const AdminSchedules: React.FC<IAdminSchedules> = ({ navigation }) => {
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
    }
  }, [scheduleData, searchValue])

  const deleteData = (id: number | string) => {
    setData(prev => prev.filter(e => e.id != id))
  }
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
    return data.map((e, i) => {
      return {
        title: (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.nameStyle}>Гэрээний дугаар: {e.license}</Text>
              <Text style={styles.jobStyle}>{displayDate(e.date)}</Text>
            </View>
          </View>
        ),
        content: (
          <AdminListDropdown
            data={e}
            index={i}
            deleteData={deleteData}
            navigation={navigation}
            navigateScreen='AddSchedule'
          />
        ),
      }
    })
  }

  const styles = StyleSheet.create({
    addButton: {
      backgroundColor: theme.primary,
      borderRadius: 10,
      height: 42,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    addButtonText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 12,
    },
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
          <TouchableOpacity
            onPress={() => navigation.navigate('AddSchedule')}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add new</Text>
          </TouchableOpacity>
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
