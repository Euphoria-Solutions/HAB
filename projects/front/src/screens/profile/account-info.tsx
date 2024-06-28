import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import {
  ChangeProfilePicture,
  ListContainer,
  ProfileFixInfo,
} from '../../components/common'
import { EditIcon, KeyIcon } from '../../assets/icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../../auth/auth-provider'

type AccountInfoProps = {
  navigation: NavigationProp<RootStackParamList, 'AccountInfo'>
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [number, setNumber] = useState('')
  const [job, setJob] = useState({ value: '', label: '' })
  const [reason, setReason] = useState('')
  const { user } = useAuth()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: headerEditButton,
    })
  })

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

  const styles = StyleSheet.create({
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
    listText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
      width: '100%',
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ChangeProfilePicture />
        <ListContainer
          itemOptions={{ allDisabled: true, allContentStyle: styles.listText }}
          items={[
            { title: 'Таны овог', content: user?.lastname, index: 1 },
            { title: 'Утасны дугаар', content: user?.phoneNumber, index: 2 },
            { title: 'Албан тушаал', content: user?.job, index: 3 },
          ]}
        />
        <ListContainer
          items={[
            {
              titleIcon: <KeyIcon style={styles.iconStyle} />,
              title: 'Нууц үг солих',
              content: 'default',
              onPress: navigateToPassword,
            },
          ]}
        />
      </View>
      <ProfileFixInfo
        reason={reason}
        setReason={setReason}
        job={job}
        setJob={setJob}
        number={number}
        setNumber={setNumber}
        setFirstname={setFirstname}
        firstname={firstname}
        lastname={lastname}
        setLastname={setLastname}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  )
}
