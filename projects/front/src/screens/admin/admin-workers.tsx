import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput, Tab } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { WorkerType, workerData } from '../../utils'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'

interface IAdminWorkers {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Workers'>
}

export const AdminWorkers: React.FC<IAdminWorkers> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [tab, setTab] = useState(0)
  const [data, setData] = useState<WorkerType[]>([])

  useEffect(() => {
    if (workerData) {
      if (searchValue) {
        const tempVal = searchValue.toLowerCase()
        setData(
          workerData.filter(e => {
            if ((e.name + ' ' + e.surname).toLowerCase().includes(tempVal)) {
              return true
            }
            return false
          })
        )
      } else {
        setData(workerData)
      }
      setData(prev =>
        prev.filter(e => {
          if (tab == 0 && e.job == 'driver') {
            return true
          }
          if (tab == 1 && e.job == 'engineer') {
            return true
          }
          if (tab == 2 && e.job == 'mechanic') {
            return true
          }
        })
      )
    }
  }, [workerData, searchValue, tab])

  const getJobTitle = (job: 'driver' | 'mechanic' | 'engineer' | 'manager') => {
    switch (job) {
      case 'driver':
        return 'Жолооч'
      case 'mechanic':
        return 'Механикч'
      case 'engineer':
        return 'ХАБЭА'
    }
  }

  const deleteData = (id: number | string) => {
    setData(prev => prev.filter(e => e.id != id))
  }

  const showItems = () => {
    return data.map((e, i) => {
      return {
        title: (
          <View style={styles.listItem}>
            <View style={styles.profilePicture} />
            <View>
              <Text style={styles.nameStyle}>
                {e.name} {e.surname}
              </Text>
              <Text style={styles.jobStyle}>{getJobTitle(e.job)}</Text>
            </View>
          </View>
        ),
        content: (
          <AdminListDropdown
            data={e}
            index={i}
            deleteData={deleteData}
            navigation={navigation}
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
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 18,
      height: 36,
      width: 36,
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
            onPress={() => navigation.navigate('AddWorker')}
            style={styles.addButton}
          >
            <Text style={styles.addButtonText}>+ Add new</Text>
          </TouchableOpacity>
        </View>
        <Tab
          allTabs={['Жолооч', 'ХАБЭА', 'Механикч']}
          tab={tab}
          setTab={setTab}
        />
        <ListContainer
          style={styles.listContainerStyle}
          itemOptions={{ allDisabled: true }}
          items={showItems()}
        />
      </ScrollView>
    </EventProvider>
  )
}
