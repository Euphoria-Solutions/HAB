import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { RootWorkStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import {
  DataType,
  QueryNameType,
  QueryType,
  TagType,
} from '../../utils/interface'
import {
  CarDetail,
  SearchInput,
  Tab,
  WorkSearch,
} from '../../components/common'
import { carTempData } from '../../utils/temp-datas'

type WorkScreenProps = {
  navigation: BottomTabNavigationProp<RootWorkStackParamList, 'Main'>
}

export const WorkScreen: React.FC<WorkScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [tab, setTab] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [data, setData] = useState(carTempData)
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
    carTempData.map(e => {
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
  })

  return (
    <View style={styles.container}>
      <Tab
        onTabChange={e => handleTabChange(e)}
        allTabs={['Өдрөөр', 'Улирал']}
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
          data={data}
          setSearch={setSearchObject}
          tags={searchTags}
          setTags={setSearchTags}
          focused={searchFocus}
        />
        {(searchObject || !searchFocus) &&
          data.map((e, i) => (
            <CarDetail
              data={e}
              key={i}
              onPress={() => navigation.navigate('Info', { id: e.id })}
            />
          ))}
      </ScrollView>
    </View>
  )
}
