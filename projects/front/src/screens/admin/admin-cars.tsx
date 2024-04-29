import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer, SearchInput } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { DataType, carTempData } from '../../utils'
import { AdminListDropdown } from '../../components/content'
import { EventProvider } from 'react-native-outside-press'

interface IAdminCars {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Cars'>
}

export const AdminCars: React.FC<IAdminCars> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [data, setData] = useState<DataType[]>([])

  useEffect(() => {
    if (carTempData) {
      if (searchValue) {
        const tempVal = searchValue.toLowerCase()
        setData(
          carTempData.filter(e => {
            if (e.carNumber.toLowerCase().includes(tempVal)) {
              return true
            }
            if (e.trailerNumber.toLowerCase().includes(tempVal)) {
              return true
            }
            if (e.trailerNumber2?.toLowerCase().includes(tempVal)) {
              return true
            }
            return false
          })
        )
      } else {
        setData(carTempData)
      }
    }
  }, [carTempData, searchValue])

  const deleteData = (id: number | string) => {
    setData(prev => prev.filter(e => e.id != id))
  }

  const showItems = () => {
    return data.map((e, i) => {
      return {
        title: (
          <View style={styles.listItem}>
            <View>
              <Text style={styles.nameStyle}>Улсын дугаар: {e.carNumber}</Text>
              <Text style={styles.jobStyle}>
                Чиргүүлийн дугаар: {e.trailerNumber} | {e.trailerNumber2}
              </Text>
            </View>
          </View>
        ),
        content: (
          <AdminListDropdown
            data={e}
            index={i}
            deleteData={deleteData}
            navigation={navigation}
            navigateScreen='AddCar'
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
