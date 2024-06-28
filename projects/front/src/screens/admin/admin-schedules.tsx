import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'
import { DELETE_DELIVERY, GET_DELIVERIES } from '../../graphql'
import { useMutation, useQuery } from '@apollo/client'

interface IAdminSchedules {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Schedule'>
}

export const AdminSchedules: React.FC<IAdminSchedules> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>([])

  const { data, loading, error, refetch } = useQuery(GET_DELIVERIES)
  const [deleteDelivery] = useMutation(DELETE_DELIVERY)

  useEffect(() => {
    refetch()
  }, [navigation])

  useEffect(() => {
    if (data && data.getDeliveries) {
      const allDeliveries = data.getDeliveries
      let filteredDeliveries = allDeliveries

      if (searchValue) {
        const searchValueLower = searchValue.toLowerCase()
        filteredDeliveries = allDeliveries.filter(
          (delivery: { contractNumber: string }) =>
            delivery.contractNumber.toLowerCase().includes(searchValueLower)
        )
      }

      setFilteredData(filteredDeliveries)
    }
  }, [data, searchValue])

  const deleteData = async (_id: string) => {
    try {
      await deleteDelivery({
        variables: { _id },
      })
      setFilteredData(filteredData.filter(delivery => delivery._id !== _id))
      refetch()
    } catch (error) {
      console.error('Error deleting delivery:', error)
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
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

  const showItems = () => {
    return filteredData.map((delivery, index) => ({
      title: (
        <View style={styles.listItem} key={delivery.id}>
          <View>
            <Text style={styles.nameStyle}>
              Гэрээний дугаар: {delivery.contractNumber}
            </Text>
            <Text style={styles.jobStyle}>{formatDate(delivery.date)}</Text>
          </View>
        </View>
      ),
      content: (
        <AdminListDropdown
          data={delivery}
          index={index}
          deleteData={deleteData}
          navigation={navigation}
          navigateScreen='AddSchedule'
        />
      ),
    }))
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading schedules</Text>

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
