import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootWorkStackParamList } from '../../navigation/types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTheme } from '../../theme/theme-provider'
import { CameraIcon } from '../../assets/icons'
import {
  DropdownList,
  ListContainer,
  LoginInput,
  SubmitButton,
} from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { CarProblemType } from '../../utils/interface'

type ReasonProps = {
  navigation: BottomTabNavigationProp<RootWorkStackParamList, 'Reason'>
}
type ListItemsType = {
  title: string
  content: string
  onPress: () => void
}

export const WorkReason: React.FC<ReasonProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const route = useRoute()
  const [utility, setUtility] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [data, setData] = useState<CarProblemType[]>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <></>
      },
    })
  })
  useEffect(() => {
    console.log(route)
    if (route && route.params) {
      setShowFinal(true)
      const { data: temp } = route.params as { data: CarProblemType[] }
      setData(temp)
    }
  }, [route])

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const handleSubmit = () => {
    navigation.goBack()
  }
  const showItems = (): ListItemsType[] => {
    const temp: ListItemsType[] = []

    data?.map((e, i) =>
      temp.push({
        title: i + 1 + '. ' + e.title,
        content: 'default',
        onPress: () => navigation.navigate('DetailedInfo', { id: i }),
      })
    )

    return temp
  }

  const styles = StyleSheet.create({
    buttonStyle: {
      bottom: 20,
      marginHorizontal: 20,
      position: 'absolute',
      width: '100%',
    },
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    contentContainer: {
      gap: 12,
      paddingBottom: 100,
      paddingTop: 20,
    },
    iconStyle: {
      color: theme.iconBg,
    },
    listStyle: {
      zIndex: -1,
    },
    listTitleStyle: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '800',
    },
    multilineInputStyle: {
      height: 152,
      paddingTop: 16,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleGrayStyle: {
      color: theme.darktext,
      fontSize: 15,
      fontWeight: '800',
    },
    titleStyle: {
      color: theme.text,
      fontSize: 15,
      fontWeight: '800',
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {!showFinal ? (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.titleGrayStyle}>
                Асуудал: <Text style={styles.titleStyle}>Засварлах</Text>
              </Text>
              <TouchableOpacity>
                <CameraIcon style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
            <LoginInput
              placeholder='Доголдолтой эд анги'
              value={utility}
              setValue={setUtility}
            />
            <LoginInput
              placeholder='Тайлан'
              value={reason}
              setValue={setReason}
              style={styles.multilineInputStyle}
              multiline
            />
            <Text style={styles.titleStyle}>Шаардлагатай эд анги</Text>
            <DropdownList />
          </>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.titleStyle}>Тайлан бичих</Text>
              <TouchableOpacity>
                <CameraIcon style={styles.iconStyle} />
              </TouchableOpacity>
            </View>
            <LoginInput
              placeholder='Тайлан'
              value={reason}
              setValue={setReason}
              style={styles.multilineInputStyle}
              multiline
            />
            <Text style={styles.titleStyle}>Асуудал үссэн хэсгүүд</Text>
            <ListContainer
              itemOptions={{ allTitleStyle: styles.listTitleStyle }}
              items={showItems()}
            />
          </>
        )}
        <ListContainer
          style={styles.listStyle}
          items={[
            {
              title: 'Хавсарсан зурагнууд: 8',
              content: 'default',
            },
          ]}
        />
      </ScrollView>
      <SubmitButton
        style={styles.buttonStyle}
        onSubmit={handleSubmit}
        loading={loading}
        onPress={handleSave}
        title='Хадгалах'
      />
    </View>
  )
}
