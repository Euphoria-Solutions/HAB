import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootWorkStackParamList } from '../../navigation/types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTheme } from '../../theme/theme-provider'
import { LeftArrowIcon, RightArrowIcon } from '../../assets/icons'
import { useRoute } from '@react-navigation/native'
import { carTempData } from '../../utils/temp-datas'
import { DataType } from '../../utils/interface'
import {
  CarInfoList,
  CarGeneralInfo,
  CarConfirm,
} from '../../components/content'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../auth/auth-provider'

type CarInfoProps = {
  navigation: BottomTabNavigationProp<RootWorkStackParamList, 'Info'>
}

export const WorkCarInfo: React.FC<CarInfoProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const route = useRoute()
  const { id } = route.params as { id: string }
  const [data, setData] = useState<DataType>()
  const [page, setPage] = useState(0)
  const [count, setCount] = useState({ all: 0, finished: 0 })
  const [pages, setPages] = useState([
    <CarGeneralInfo key={0} data={data} />,
    <CarInfoList type='engine' key={1} />,
    <CarInfoList type='disk' key={2} />,
    <CarInfoList type='transmission' key={3} />,
    <CarInfoList type='other' key={4} />,
    <CarInfoList
      count={count}
      setCount={setCount}
      showCount
      type='all'
      key={5}
    />,
    <CarConfirm key={6} data={data} />,
  ])

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', clearData)
    return unsubscribe
  }, [navigation])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerInfo}>
            <Text style={styles.headerText}>{translateState().text}</Text>
          </View>
        )
      },
    })
  })
  useEffect(() => {
    if (id) {
      setData(carTempData.find(e => e.id == id))
      setPage(0)
    }
  }, [id])
  useEffect(() => {
    saveData()
  }, [page])
  useEffect(() => {
    getData()
  })
  useEffect(() => {
    if (user?.job == 'manager' && data) {
      setPages([
        <CarGeneralInfo key={0} data={data} />,
        <CarInfoList
          count={count}
          setCount={setCount}
          showCount
          type='all'
          key={1}
        />,
        <CarConfirm key={2} data={data} />,
      ])
    }
  }, [user, data])

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('@pageCount', page.toString())
    } catch (error) {
      console.log('Error saving data:', error)
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@pageCount')
      if (value !== null) {
        setPage(parseInt(value, 10))
      }
    } catch (error) {
      console.log('Error retrieving data:', error)
    }
  }
  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('@pageCount')
    } catch (error) {
      console.log('Error clearing data:', error)
    }
  }
  const handleNextPage = () => {
    setPage(page + 1)
  }
  const handlePreviousPage = () => {
    setPage(page - 1)
  }
  const translateState = (): { text: string; color: string } => {
    if (!data) {
      return { text: '', color: '' }
    }
    switch (data.state) {
      case 'finished':
        return { text: 'ДУУССАН', color: theme.green }
      case 'waiting':
        return { text: 'ХҮЛЭЭГДЭЖ БАЙНА', color: theme.red }
      case 'being processed':
        return { text: 'ХИЙГДЭЖ БАЙНА', color: theme.yellow }
    }
  }
  const disabledLogic = (): boolean => {
    //TODO return page + 2 >= pages.length && count.all != count.finished
    return false
  }
  const dontShowNav = (): boolean => {
    return pages.length - 1 <= page
  }

  const styles = StyleSheet.create({
    bottomButtons: {
      alignItems: 'center',
      bottom: 20,
      flexDirection: 'row',
      justifyContent: page == 0 ? 'flex-end' : 'space-between',
      position: 'absolute',
      right: 20,
      width: '100%',
    },
    button: {
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    buttonDisabled: {
      alignItems: 'center',
      backgroundColor: theme.grey400,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },
    buttonText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 13,
    },
    container: {
      backgroundColor: theme.bg,
      gap: 50,
      height: '100%',
      paddingHorizontal: 20,
    },
    content: {
      gap: 16,
      height: dontShowNav() ? '100%' : undefined,
      paddingBottom: dontShowNav() ? 20 : 80,
      paddingTop: 16,
    },
    headerInfo: {
      alignItems: 'center',
      backgroundColor: translateState().color,
      borderRadius: 4,
      minWidth: 86,
      paddingHorizontal: 11,
      paddingVertical: 8,
    },
    headerText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 8,
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!dontShowNav()}
        contentContainerStyle={styles.content}
      >
        {pages[page]}
      </ScrollView>
      {!dontShowNav() && (
        <View style={styles.bottomButtons}>
          {page > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={handlePreviousPage}
            >
              <LeftArrowIcon style={styles.buttonText} />
              <Text style={styles.buttonText}>Буцах</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={disabledLogic()}
            style={disabledLogic() ? styles.buttonDisabled : styles.button}
            onPress={handleNextPage}
          >
            <Text style={styles.buttonText}>Дараагийн хуудас</Text>
            <RightArrowIcon style={styles.buttonText} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
