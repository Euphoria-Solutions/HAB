import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootBottomTabParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import {
  DataType,
  QueryNameType,
  QueryType,
  TagType,
} from '../../utils/interface'
import { CarDetail, SearchInput, WorkSearch } from '../../components/common'

type WorkScreenProps = {
  navigation: BottomTabNavigationProp<RootBottomTabParamList, 'Work'>
}

export const WorkScreen: React.FC<WorkScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [tab, setTab] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [data, setData] = useState(tempData)
  const [searchQuery, setSearchQuery] = useState<QueryType>('')
  const [searchTags, setSearchTags] = useState<TagType>({
    timeFrame: 'Өдрөөр',
    search: '',
  })
  const [searchObject, setSearchObject] = useState<QueryNameType | null>(null)

  useEffect(() => {
    setData(getData())
  }, [tab, searchObject])
  useEffect(() => {
    if (!searchFocus) {
      setSearchTags({ ...searchTags, search: '' })
      setSearchObject(null)
    }
  }, [searchFocus])

  const getData = (): DataType[] => {
    const result: DataType[] = []
    let day: Date

    if (tab == 0) {
      day = new Date(Date.now())
      day.setDate(day.getDate() + 1)
    } else {
      day = new Date(2024, 5, 21)
    }
    tempData.map(e => {
      if (e.date <= day) {
        if (searchObject) {
          if (searchObject.name == 'date' && e.date <= searchObject.title) {
            result.push(e)
          } else if (
            searchObject.name != '' &&
            e[searchObject.name] == searchObject.title
          ) {
            result.push(e)
          }
        } else {
          result.push(e)
        }
      }
    })

    return result
  }
  const handleTabChange = (t: number) => {
    setSearchTags({ ...searchTags, timeFrame: t == 0 ? 'Өдрөөр' : 'Улирал' })
    setTab(t)
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      padding: 20,
      paddingBottom: 0,
    },
    scrollStyle: {
      gap: 8,
      paddingBottom: 20,
    },
    tabButton: {
      flex: 1,
      flexDirection: 'column',
    },
    tabButtonContainer: {
      flexDirection: 'row',
      gap: 8,
      width: '100%',
    },
    tabButtonText: {
      color: theme.text,
      fontWeight: 'bold',
    },
    tabButtonTouchable: {
      alignItems: 'center',
      borderRadius: 10,
      height: 36,
      justifyContent: 'center',
      width: '100%',
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.tabButtonContainer}>
        <View style={styles.tabButton}>
          <TouchableOpacity
            style={[
              styles.tabButtonTouchable,
              { backgroundColor: tab == 0 ? theme.primary : theme.lightBg },
            ]}
            onPress={() => handleTabChange(0)}
          >
            <Text style={styles.tabButtonText}>Өдрөөр</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabButton}>
          <TouchableOpacity
            style={[
              styles.tabButtonTouchable,
              { backgroundColor: tab == 1 ? theme.primary : theme.lightBg },
            ]}
            onPress={() => handleTabChange(1)}
          >
            <Text style={styles.tabButtonText}>Улирал</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          data={data}
          setSearch={setSearchObject}
          tags={searchTags}
          setTags={setSearchTags}
          focused={searchFocus}
        />
        {(searchObject || !searchFocus) &&
          data.map((e, i) => (
            <CarDetail
              key={i}
              carNumber={e.carNumber}
              state={e.state}
              progress={e.progress}
              date={e.date}
              id={e.id}
              driver={e.driver}
              location={e.location}
              onPress={() => navigation.navigate('Home')}
            />
          ))}
      </ScrollView>
    </View>
  )
}

const tempData: DataType[] = [
  {
    carNumber: '4327 УНА',
    state: 'finished',
    progress: '3/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '4327 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '5050 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '3030 УБА',
    state: 'waiting',
    progress: '0/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэ Нэхий',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '5050 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '4444 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
]
