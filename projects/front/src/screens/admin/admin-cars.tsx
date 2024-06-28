import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { DataType } from '../../utils'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'
import { useMutation, useQuery } from '@apollo/client'
import { GET_VEHICLES, REMOVE_VEHICLE } from '../../graphql'

interface IAdminCars {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Cars'>
}

export const AdminCars: React.FC<IAdminCars> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState<DataType[]>([])

  const { data, loading, error, refetch } = useQuery(GET_VEHICLES)
  const [deleteVehicle] = useMutation(REMOVE_VEHICLE)

  useEffect(() => {
    refetch()
  }, [navigation])

  useEffect(() => {
    if (data && data.getVehicle) {
      const allVehicles = data.getVehicle

      if (searchValue) {
        const searchValueLower = searchValue.toLowerCase()
        const filtered = allVehicles.filter(
          (vehicle: {
            license: string
            trailerNumber: string
            trailerNumber2: string
          }) => {
            const { license, trailerNumber, trailerNumber2 } = vehicle
            return (
              license.toLowerCase().includes(searchValueLower) ||
              trailerNumber.toLowerCase().includes(searchValueLower) ||
              (trailerNumber2 &&
                trailerNumber2.toLowerCase().includes(searchValueLower))
            )
          }
        )
        setFilteredData(filtered)
      } else {
        setFilteredData(allVehicles)
      }
    }
  }, [data, searchValue])

  const deleteData = async (_id: string) => {
    try {
      await deleteVehicle({
        variables: { _id },
      })
      setFilteredData(filteredData.filter(user => user._id !== _id))
      refetch()
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  const showItems = () => {
    return filteredData.map((vehicle, index) => ({
      title: (
        <View style={styles.listItem} key={vehicle._id}>
          <View>
            <Text style={styles.nameStyle}>
              Улсын дугаар: {vehicle.license}
            </Text>
            <Text style={styles.jobStyle}>
              Чиргүүлийн дугаар: {vehicle.trailerNumber} |{' '}
              {vehicle.trailerNumber2}
            </Text>
          </View>
        </View>
      ),
      content: (
        <AdminListDropdown
          data={vehicle}
          index={index}
          deleteData={deleteData}
          navigation={navigation}
          navigateScreen='AddCar'
        />
      ),
    }))
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error loading vehicles</Text>

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
            onPress={() => navigation.navigate('AddCar')}
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
