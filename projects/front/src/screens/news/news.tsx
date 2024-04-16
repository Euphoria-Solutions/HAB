import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootManagerStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import { SearchInput, Weather } from '../../components/common'
import { NewsCard } from '../../components/content'
import { newsData, NewsType } from '../../utils/'

type NewsScreenProps = {
  navigation: BottomTabNavigationProp<RootManagerStackParamList, 'Home'>
}

export const NewsScreen: React.FC<NewsScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [searchValue, setSearchValue] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [data, setData] = useState(newsData)
  const [dataToShow, setDataToShow] = useState<NewsType[]>()

  useEffect(() => {
    if (!searchValue) {
      setDataToShow(data)
    } else {
      setDataToShow(
        data.filter(e => {
          const translated = searchValue.toLowerCase()
          if (e.job.toLowerCase().includes(translated)) {
            return true
          }
          if (e.name.toLowerCase().includes(translated)) {
            return true
          }
          if (e.text?.toLowerCase().includes(translated)) {
            return true
          }
          return false
        })
      )
    }
  }, [searchValue, data])

  const deleteData = (index: number) => {
    setData(prev => {
      const temp = [...prev]
      temp.splice(index, 1)
      return temp
    })
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      paddingBottom: 0,
    },
    inputStyle: {
      width: '100%',
    },
    scrollStyle: {
      gap: 20,
      paddingBottom: 20,
    },
    searchContainer: {
      gap: 12,
      paddingHorizontal: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      gap: 16,
      paddingHorizontal: 8,
    },
    tabText: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 14,
    },
    tabTextInactive: {
      color: theme.iconBg,
      fontFamily: theme.commi700,
      fontSize: 14,
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollStyle}>
        <View style={styles.searchContainer}>
          <SearchInput
            focused={searchFocused}
            setFocused={setSearchFocused}
            style={styles.inputStyle}
            value={searchValue}
            setValue={setSearchValue}
          />
          <View style={styles.tabContainer}>
            <TouchableOpacity>
              <Text style={styles.tabText}>Мэдээлэл</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabTextInactive}>Заавар</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.tabTextInactive}>Тусламж</Text>
            </TouchableOpacity>
          </View>
          <Weather />
        </View>
        {dataToShow &&
          dataToShow.map((e, i) => (
            <NewsCard
              deleteData={() => deleteData(i)}
              key={i}
              navigation={navigation}
              name={e.name}
              job={e.job}
              time={e.time}
              imageLinks={e.imageLinks}
              text={e.text}
            />
          ))}
      </ScrollView>
    </View>
  )
}
