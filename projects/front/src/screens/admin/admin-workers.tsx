import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput, Tab } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_USER, GET_USERS } from '../../graphql'
import { UserType, WorkerType } from '../../utils'

interface IAdminWorkers {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Workers'>
}

export const AdminWorkers: React.FC<IAdminWorkers> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [tab, setTab] = useState(0)
  const [filteredData, setFilteredData] = useState<any[]>([])

  const { data, loading, error, refetch } = useQuery(GET_USERS)
  const [deleteUser] = useMutation(DELETE_USER)

  useEffect(() => {
    refetch()
  }, [navigation])

  useEffect(() => {
    if (data && data.getUsers) {
      const allUsers = data.getUsers

      let filteredUsers = allUsers

      if (searchValue) {
        const searchValueLower = searchValue.toLowerCase()
        filteredUsers = allUsers.filter((user: WorkerType) => {
          const fullName = `${user.firstname} ${user.lastname}`.toLowerCase()
          return fullName.includes(searchValueLower)
        })
      }

      if (tab === 0) {
        filteredUsers = filteredUsers.filter(
          (user: UserType) => user.job === 'driver'
        )
      } else if (tab === 1) {
        filteredUsers = filteredUsers.filter(
          (user: UserType) => user.job === 'engineer'
        )
      } else if (tab === 2) {
        filteredUsers = filteredUsers.filter(
          (user: UserType) => user.job === 'mechanic'
        )
      }

      setFilteredData(filteredUsers)
    }
  }, [data, searchValue, tab])

  const getJobTitle = (job: 'driver' | 'mechanic' | 'engineer' | 'manager') => {
    switch (job) {
      case 'driver':
        return 'Жолооч'
      case 'mechanic':
        return 'Механикч'
      case 'engineer':
        return 'ХАБЭА'
      case 'manager':
        return 'Менежер'
      default:
        return 'Ажилтан'
    }
  }

  const deleteData = async (_id: string) => {
    try {
      await deleteUser({
        variables: { _id },
      })
      setFilteredData(filteredData.filter(user => user._id !== _id))
      refetch()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
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

  const showItems = () => {
    return filteredData.map((user, index) => ({
      title: (
        <View style={styles.listItem} key={user.id}>
          <View style={styles.profilePicture} />
          <View>
            <Text style={styles.nameStyle}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={styles.jobStyle}>{getJobTitle(user.job)}</Text>
          </View>
        </View>
      ),
      content: (
        <AdminListDropdown
          data={user}
          index={index}
          deleteData={deleteData}
          navigation={navigation}
          navigateScreen='AddWorker'
        />
      ),
    }))
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading workers</Text>

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
