import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { CloseIcon } from '../../assets/icons/'
import {
  DataType,
  QueryNameType,
  QueryType,
  TagType,
} from '../../utils/interface'
import DatePicker from 'react-native-date-picker'
import { ListContainer } from './'

type WorkSearchProps = {
  searchInputValue: string
  setSearchInputValue: (_v: string) => void
  query: QueryType
  setQuery: (_v: QueryType) => void
  data: DataType[]
  setSearch: (_v: QueryNameType | null) => void
  tags: TagType
  setTags: (_v: TagType) => void
  focused: boolean
}
type ListItemType = {
  content: string
  title: string
  onPress: () => void
}

export const WorkSearch: React.FC<WorkSearchProps> = ({
  query,
  setQuery,
  data,
  setSearch,
  searchInputValue,
  setSearchInputValue,
  tags,
  setTags,
  focused,
}) => {
  const { theme } = useTheme()
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [visibleData, setVisibleData] = useState(queryNames)
  const [hideList, setHideList] = useState(false)
  const [uniqueStrings, setUniqueStrings] = useState([''])

  useEffect(() => {
    if (query && query != 'date') {
      setUniqueStrings(
        getUniqueStrings(query).filter(e => {
          return (
            typeof e == 'string' &&
            e.toLowerCase().includes(searchInputValue.toLowerCase() || '')
          )
        })
      )
    } else {
      setVisibleData(
        queryNames.filter(e => {
          return (
            typeof e.title == 'string' &&
            e.title.toLowerCase().includes(searchInputValue.toLowerCase() || '')
          )
        })
      )
    }
  }, [searchInputValue, query])
  useEffect(() => {
    focused && setHideList(false)
  }, [focused])

  const removeTimeFrameTag = () => {
    setTags({ ...tags, timeFrame: '' })
  }
  const removeSearchTag = () => {
    setHideList(false)
    setSearch(null)
    setQuery('')
    setTags({ ...tags, search: '' })
  }

  const handleQueryChange = (e: QueryNameType) => {
    if (e.name == 'date') {
      setOpen(true)
    } else {
      setQuery(e.name)
      setSearchInputValue('')
    }
    setTags({ ...tags, search: typeof e.title == 'string' ? e.title : '' })
  }
  const handleSearch = (e: string) => {
    setSearch({ name: query, title: e })
    setQuery('')
    setHideList(true)
  }
  const handleDateConfirm = (date: Date) => {
    setDate(date)
    setOpen(false)
    setSearch({ title: date, name: 'date' })
    setQuery('')
    setHideList(true)
    setSearchInputValue('')
  }

  const getUniqueStrings = (name: QueryType): string[] => {
    if (name == '' || name == 'date') {
      return []
    }
    const result: string[] = []
    data.map(e => {
      if (!result.includes(e[name])) {
        result.push(e[name])
      }
    })
    return result
  }
  const returnQueries = (): ListItemType[] => {
    const things: ListItemType[] = []

    if (query == '') {
      visibleData.map(e => {
        things.push({
          content: 'default',
          title: typeof e.title == 'string' ? e.title : '',
          onPress: () => handleQueryChange(e),
        })
      })
    } else if (query != 'date') {
      uniqueStrings.map(e => {
        things.push({
          content: 'default',
          title: e,
          onPress: () => handleSearch(e),
        })
      })
    }

    return things
  }

  const styles = StyleSheet.create({
    iconStyle: {
      color: theme.iconBg,
    },
    searchInfo: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchInfoButton: {
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 6,
      padding: 5,
      paddingHorizontal: 12,
    },
    searchInfoButtonText: {
      color: theme.text,
      fontSize: 10,
      fontWeight: 'bold',
    },
    searchInfoText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: 'bold',
    },
    tagContainer: {
      alignItems: 'flex-end',
      flex: 0,
      gap: 6,
    },
  })

  return (
    focused && (
      <>
        <View style={styles.searchInfo}>
          <Text style={styles.searchInfoText}>Сонголтууд</Text>
          <View style={styles.tagContainer}>
            {tags.search && (
              <TouchableOpacity
                onPress={removeSearchTag}
                style={styles.searchInfoButton}
              >
                <Text style={styles.searchInfoButtonText}>{tags.search}</Text>
                <CloseIcon style={styles.searchInfoButtonText} />
              </TouchableOpacity>
            )}
            {tags.timeFrame && (
              <TouchableOpacity
                onPress={removeTimeFrameTag}
                style={styles.searchInfoButton}
              >
                <Text style={styles.searchInfoButtonText}>
                  {tags.timeFrame}
                </Text>
                <CloseIcon style={styles.searchInfoButtonText} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {!hideList && <ListContainer items={returnQueries()} />}
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => handleDateConfirm(date)}
          onCancel={() => setOpen(false)}
        />
      </>
    )
  )
}

const queryNames: QueryNameType[] = [
  {
    title: 'Машины улсын дугаар',
    name: 'carNumber',
  },
  {
    title: 'Гэрээний дугаар',
    name: 'id',
  },
  {
    title: 'Жолооч',
    name: 'driver',
  },
  {
    title: 'Он сар',
    name: 'date',
  },
]
