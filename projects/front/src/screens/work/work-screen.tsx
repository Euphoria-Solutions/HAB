import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import { useLazyQuery, useQuery } from '@apollo/client'
import {
  CarDetail,
  SearchInput,
  Tab,
  WorkSearch,
} from '../../components/common'
import { useAuth } from '../../auth/auth-provider'
import {
  GET_DELIVERIES,
  GET_USERS,
  GET_VEHICLES,
  GET_WORKS,
} from '../../graphql'
import {
  DataType,
  QueryNameType,
  QueryType,
  TagType,
} from '../../utils/interface'
import { RootWorkStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { useWork } from '../../services/work-provder'

type WorkScreenProps = {
  navigation: BottomTabNavigationProp<RootWorkStackParamList, 'Main'>
}

type IncomingWorkType = {
  _id: string
  vehicle: string
  delivery: string
  mechanicCheckList: string
  prescription: string
  mechanicEngineerConfirmation: string
  habEngineerConfirmation: string
  driverConfirmation: string
  progress: string
  managerState: string
  state: string
}

export const WorkScreen: React.FC<WorkScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [tab, setTab] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [searchQuery, setSearchQuery] = useState<QueryType>('')
  const [searchTags, setSearchTags] = useState<TagType>({
    timeFrame: 'Өдрөөр',
    search: '',
  })
  const [work, setWork] = useState<DataType[]>([])
  const [searchObject, setSearchObject] = useState<QueryNameType | null>(null)
  const {
    loading: workLoading,
    error: workError,
    data: workData,
  } = useQuery(GET_WORKS)
  const [getVehicles] = useLazyQuery(GET_VEHICLES)
  const [getDeliveries] = useLazyQuery(GET_DELIVERIES)
  const [getDriver] = useLazyQuery(GET_USERS)
  const { workData: contextWorkData, setWorkData } = useWork()

  useEffect(() => {
    if (workData && workData.getWorks) {
      const settingUpWorkData = async () => {
        try {
          const fetchedData = await Promise.all(
            workData.getWorks.map(async (works: IncomingWorkType) => {
              return await getWorkData(works)
            })
          )
          setWork(fetchedData)
          setWorkData(fetchedData)
        } catch (error) {
          console.error('Error setting up work data:', error)
        }
      }
      settingUpWorkData()
    }
  }, [workData])

  useEffect(() => {
    setWork(getFilteredData())
  }, [tab, searchObject])

  const getWorkData = async (works: IncomingWorkType): Promise<DataType> => {
    try {
      const { data: vehicleData } = await getVehicles({
        variables: { license: works.vehicle },
      })
      const { data: deliveryData } = await getDeliveries({
        variables: { contractNumber: works.delivery },
      })
      const { data: driverData } = await getDriver({
        variables: { username: deliveryData.getDeliveries[0]?.driver },
      })

      const newWork: DataType = {
        _id: works._id,
        license: vehicleData?.getVehicle[0]?.license || '',
        state: works.state,
        date: new Date(deliveryData?.getDeliveries[0]?.date || Date.now()),
        progress: works.progress,
        location: deliveryData?.getDeliveries[0]?.location || '',
        driver: driverData?.getUsers[0]?.firstname || '',
        trailerNumber: vehicleData?.getVehicle[0]?.trailerNumber1 || '',
        trailerNumber2: vehicleData?.getVehicle[0]?.trailerNumber2 || '',
        signature: works.habEngineerConfirmation,
        managerState: works.managerState,
        contractNumber: deliveryData?.getDeliveries[0]?.contractNumber || '',
        mechanicCheckList: works.mechanicCheckList,
        prescription: works.prescription,
      }

      return newWork
    } catch (error) {
      console.error('Error fetching work data:', error)
      return {
        _id: works._id,
        license: '',
        state: works.state,
        date: new Date(),
        progress: works.progress,
        location: '',
        driver: '',
        trailerNumber: '',
        trailerNumber2: '',
        signature: '',
        managerState: works.managerState,
        contractNumber: '',
        mechanicCheckList: works.mechanicCheckList,
        prescription: works.prescription,
      }
    }
  }

  const getFilteredData = (): DataType[] => {
    return work.filter(e => {
      const statement =
        user?.job !== 'mechanic'
          ? (tab === 0 && e.state === 'finished') ||
            (tab === 1 && e.state !== 'finished')
          : (tab === 0 && e.date < new Date()) ||
            (tab === 1 && e.date < new Date(2024, 5, 21))

      if (!statement) return false
      if (searchObject) {
        if (searchObject.name === 'date' && e.date <= searchObject.title)
          return true
        if (searchObject.name && e[searchObject.name] === searchObject.title)
          return true
      } else {
        return true
      }
    })
  }

  const handleTabChange = (t: number) => {
    setTab(t)
    setSearchTags(
      user?.job !== 'mechanic'
        ? {
            ...searchTags,
            timeFrame: t === 0 ? 'Баталгаажсан' : 'Хүлээгдэж байгаа',
          }
        : { ...searchTags, timeFrame: t === 0 ? 'Өдрөөр' : 'Улирал' }
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      padding: 20,
      paddingBottom: 0,
    },
    noJob: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    noJobText: {
      color: theme.white,
      fontSize: 24,
      fontWeight: 'bold',
    },
    scrollStyle: {
      gap: 8,
      paddingBottom: 20,
    },
  })

  if (workLoading) return <Text>Loading...</Text>
  if (workError) return <Text>Error loading works</Text>

  return (
    <View style={styles.container}>
      <Tab
        onTabChange={handleTabChange}
        allTabs={
          user?.job !== 'mechanic'
            ? ['Баталгаажсан', 'Хүлээгдэж байгаа']
            : ['Өдрөөр', 'Улирал']
        }
        tab={tab}
        setTab={setTab}
      />
      <SearchInput
        focused={searchFocus}
        setFocused={setSearchFocus}
        value={searchValue}
        setValue={setSearchValue}
      />
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <WorkSearch
          setSearchInputValue={setSearchValue}
          searchInputValue={searchValue}
          query={searchQuery}
          setQuery={setSearchQuery}
          data={contextWorkData}
          setSearch={setSearchObject}
          tags={searchTags}
          setTags={setSearchTags}
          focused={searchFocus}
        />
        {contextWorkData ? (
          contextWorkData.map((e, i) => (
            <CarDetail
              data={e}
              key={i}
              onPress={() => {
                navigation.navigate('Info', { id: e._id })
              }}
            />
          ))
        ) : (
          <View style={styles.noJob}>
            <Text style={styles.noJobText}>
              Одоогоор оноогдсон ажил байхгүй байна
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}
