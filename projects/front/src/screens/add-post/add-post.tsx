import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { NavigationProp, useRoute } from '@react-navigation/native'
import { useTheme } from '../../theme/theme-provider'
import { CustomDropdown } from '../../components/custom'
import { ListContainer, LoginInput } from '../../components/common'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ADD_POST } from '../../graphql/mutations/post'
import { useMutation } from '@apollo/client'
import { launchImageLibrary } from 'react-native-image-picker'
import { uploadImage } from '../../helper/upload-image'
import { useAuth } from '../../auth/auth-provider'
import { RootStackParamList } from '../../navigation'

type AddPostScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'AddPost'>
}

export const AddPostScreen: React.FC<AddPostScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const route = useRoute()
  const { postId } = route.params as { postId: string }
  const [whoToShow, setWhoToShow] = useState({
    label: 'Нийтэд',
    value: 'everyone',
  })
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageLinks, setImageLinks] = useState<string[]>([])
  const { user } = useAuth()

  const [addPost] = useMutation(ADD_POST, {
    onCompleted: () => {
      navigation.goBack()
    },
    onError: error => {
      console.error(error)
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: postId ? 'Пост засварлах' : 'Пост оруулах',
      headerRight: () => (
        <TouchableOpacity onPress={handleAddPost}>
          <Text style={styles.buttonStyle}>Нийтлэх</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation, title, content, imageLinks])

  const handleAddPost = async () => {
    const variables = {
      username: user?.username,
      date: new Date(),
      photo: '',
      job: user?.job,
      title,
      text: content,
      viewer: whoToShow.value,
      imageLinks,
    }
    setTimeout(async () => {
      await addPost({ variables })
    }, 500)
  }

  const handleImageUpload = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    })
    if (!result.assets || result.assets.length === 0) return

    const imageUri = result.assets[0].uri
    if (imageUri) {
      const imageName = `post_${Date.now()}`
      const downloadURL = await uploadImage(imageUri, imageName)
      if (downloadURL) {
        setImageLinks(prevImageLinks => {
          const updatedLinks = [...prevImageLinks, downloadURL]
          console.log('Updated ImageLinks:', updatedLinks)
          return updatedLinks
        })
      }
    }
  }

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
    uploadButton: {
      borderColor: theme.border,
    },
  })

  return (
    <View style={styles.container}>
      <CustomDropdown
        onSelect={e => setWhoToShow(e)}
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
        items={imageLinks.map((link, index) => ({
          content: link,
          title: `Image ${index + 1}:`,
        }))}
      />
      <View style={styles.uploadButton}>
        <Button title='Upload Image' onPress={handleImageUpload} />
      </View>
    </View>
  )
}
