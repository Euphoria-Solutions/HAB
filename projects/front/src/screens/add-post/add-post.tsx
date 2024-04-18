import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { NavigationProp, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { CustomDropdown } from '../../components/custom'
import { ListContainer, LoginInput } from '../../components/common'
import { newsData } from '../../utils'
import { useNav } from '../../navigation'
import { TouchableOpacity } from 'react-native-gesture-handler'

type AddPostScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'AddPost'>
}

export const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const route = useRoute()
  const { postId } = route.params as { postId: string }
  const { setId } = useNav()
  const [whoToShow, setWhoToShow] = useState({
    label: 'Нийтэд',
    value: 'everyone',
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: postId ? 'Пост засварлах' : 'Пост оруулах',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonStyle}>Нийтлэх</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  useEffect(() => {
    if (postId) {
      newsData.map((e): void => {
        if (e.id == postId) {
          setTitle(e.job)
          setContent(e.text ?? '')
          switch (e.viewer) {
            case 'driver':
              setWhoToShow({
                value: 'driver',
                label: 'Жолооч',
              })
              break
            case 'engineer':
              setWhoToShow({
                value: 'engineer',
                label: 'Механик инженер',
              })
              break
            case 'everyone':
              setWhoToShow({
                value: 'everyone',
                label: 'Нийтэд',
              })
              break
            case 'worker':
              setWhoToShow({
                value: 'worker',
                label: 'ХАБЭА ажилтан',
              })
          }
        }
      })
      setId(null)
    }
  }, [postId])

  const styles = StyleSheet.create({
    buttonStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 13,
    },
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    multiInputStyle: {
      height: 152,
      paddingTop: 16,
    },
  })

  return (
    <View style={styles.container}>
      <CustomDropdown
        onSelect={e => {
          setWhoToShow(e)
        }}
        options={[
          { label: 'Нийтэд', value: 'everyone' },
          { label: 'ХАБЭА ажилтан', value: 'worker' },
          { label: 'Жолооч', value: 'driver' },
          { label: 'Механик инженер', value: 'engineer' },
        ]}
        value={whoToShow}
      />
      <LoginInput
        placeholder='Постны гарчиг'
        value={title}
        setValue={setTitle}
      />
      <LoginInput
        style={styles.multiInputStyle}
        placeholder='Мэдээлэл'
        value={content}
        setValue={setContent}
        multiline
      />
      <ListContainer
        items={[
          {
            content: 'default',
            title: 'Хавсарсан зурагнууд: ',
          },
        ]}
      />
    </View>
  )
}
