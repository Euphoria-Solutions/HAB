import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import {
  ListContainer,
  ListItem,
  LoginInput,
  SubmitButton,
} from '../../components/common'
import { CustomModal } from '../../components/custom'
import { CameraIcon, EditIcon, KeyIcon } from '../../assets/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

type AccountInfoProps = {
  navigation: NavigationProp<RootStackParamList, 'AccountInfo'>
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [job, setJob] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const headerEditButton = () => {
    return (
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <EditIcon style={styles.headerIconStyle} />
      </TouchableOpacity>
    )
  }
  const navigateToPassword = () => {
    navigation.navigate('ChangePassword')
  }
  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      alignItems: 'center',
      width: '100%',
    },
    buttonStyle: {
      width: '50%',
    },
    changeProfileIcon: {
      backgroundColor: theme.primary,
      color: theme.text,
      marginHorizontal: 7,
      marginVertical: 8,
    },
    changeProfilePicture: {
      backgroundColor: theme.primary,
      borderColor: theme.bg,
      borderRadius: 100,
      borderWidth: 4,
      bottom: -4,
      position: 'absolute',
      right: -4,
    },
    container: {
      backgroundColor: theme.bg,
      gap: 20,
      height: '100%',
      paddingTop: 16,
      padding: 20,
    },
    headerIconStyle: {
      color: theme.iconBg,
    },
    iconStyle: {
      color: theme.iconBg,
    },
    inputContainer: {
      gap: 20,
      paddingBottom: 20,
    },
    listText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '800',
      width: '100%',
    },
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 35,
      height: 70,
      position: 'relative',
      width: 70,
    },
    profilePictureContainer: {
      alignItems: 'center',
      marginBottom: 6,
    },
    reasonCount: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'right',
    },
    titleStyle: {
      fontSize: 11,
    },
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerEditButton,
    })
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <View style={styles.changeProfilePicture}>
              <TouchableOpacity>
                <CameraIcon style={styles.changeProfileIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ListContainer>
          <ListItem
            title='Таны овог'
            titleStyle={styles.titleStyle}
            content={<Text style={styles.listText}>Насанжаргал</Text>}
            disabled
          />
          <ListItem
            title='Таны нэр'
            titleStyle={styles.titleStyle}
            content={<Text style={styles.listText}>Төмөрцог</Text>}
            disabled
          />
          <ListItem
            title='Утасны дугаар'
            titleStyle={styles.titleStyle}
            content={<Text style={styles.listText}>+965 88889999</Text>}
            disabled
          />
          <ListItem
            title='Албан тушаал'
            titleStyle={styles.titleStyle}
            content={<Text style={styles.listText}>Жолооч</Text>}
            disabled
          />
        </ListContainer>
        <ListContainer>
          <ListItem
            titleIcon={<KeyIcon style={styles.iconStyle} />}
            onPress={navigateToPassword}
            title='Нууц үг солих'
            content='default'
          />
        </ListContainer>
      </View>
      <CustomModal
        title='Хэрэглэгчийн мэдээлэл засах хүсэлт'
        visible={modalVisible}
        setVisible={setModalVisible}
      >
        <View style={styles.inputContainer}>
          <LoginInput label='Таны овог' value={surname} setValue={setSurname} />
          <LoginInput label='Таны нэр' value={name} setValue={setName} />
          <LoginInput
            label='Утасны дугаар'
            value={number}
            setValue={setNumber}
          />
          <LoginInput label='Албан тушаал' value={job} setValue={setJob} />
          <LoginInput
            maxLength={300}
            label='Шалтгаан/Заавал бөглөнө үү/'
            value={reason}
            setValue={setReason}
          />
          <Text style={styles.reasonCount}>{reason.length}/300</Text>
          <View style={styles.buttonContainer}>
            <SubmitButton
              onSubmit={() => setModalVisible(false)}
              loading={loading}
              onPress={handleSubmit}
              style={styles.buttonStyle}
              title='Илгээх'
            />
          </View>
        </View>
      </CustomModal>
    </SafeAreaView>
  )
}
