import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootManagerStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ScrollView } from 'react-native-gesture-handler'
import { NewsType } from '../../utils/'
import { EventProvider } from 'react-native-outside-press'
import { useAuth } from '../../auth/auth-provider'
import { GET_POSTS, REMOVE_POST } from '../../graphql'
import { useMutation, useQuery } from '@apollo/client'
import { SearchInput } from '../../components/common'
import { Weather } from '../../components/common/weather'
import { NewsCard } from '../../components/content'

type NewsScreenProps = {
  navigation: BottomTabNavigationProp<RootManagerStackParamList, 'Home'>
}

export const NewsScreen: React.FC<NewsScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [data, setData] = useState<NewsType[]>()
  const [dataToShow, setDataToShow] = useState<NewsType[]>()
  const { loading, error, data: queryData, refetch } = useQuery(GET_POSTS)
  const [deletePosts] = useMutation(REMOVE_POST)

  useEffect(() => {
    if (queryData && queryData.getPosts) {
      setData(queryData.getPosts)
      setDataToShow(queryData.getPosts)
    }
  }, [queryData])

  useEffect(() => {
    refetch()
  }, [navigation])

  useEffect(() => {
    if (!searchValue) {
      setDataToShow(data)
    } else {
      setDataToShow(
        data?.filter(e => {
          const translated = searchValue.toLowerCase()
          if (e.job.toLowerCase().includes(translated)) {
            return true
          }
          if (e.username.toLowerCase().includes(translated)) {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Өглөөний мэнд, ' + user?.firstname,
    })
  }, [navigation, user])

  const deleteData = (_id: string) => {
    deletePosts({
      variables: {
        id: _id,
      },
    })
    refetch()
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      paddingBottom: 0,
    },
    empty: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    emptyText: {
      color: theme.text,
    },
    inputStyle: {
      width: '100%',
    },
    news: {
      paddingHorizontal: 20,
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

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <EventProvider>
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
          {dataToShow?.length != 0 ? (
            dataToShow?.map((e, i) => (
              <View style={styles.news} key={i}>
                <NewsCard
                  deleteData={() => deleteData(e.id)}
                  key={i}
                  data={e}
                />
              </View>
            ))
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                Одоогоор харуулах пост байхгүй байна
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </EventProvider>
  )
}
