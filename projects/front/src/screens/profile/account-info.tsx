import React, { useLayoutEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { ListContainer, ProfileFixInfo } from '../../components/common'
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
  const [job, setJob] = useState({ value: '', label: '' })
  const [reason, setReason] = useState('')

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
    listText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
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
        <ListContainer
          itemOptions={{ allDisabled: true, allContentStyle: styles.listText }}
          items={[
            { title: 'Таны овог', content: 'Насанжаргал' },
            { title: 'Утасны дугаар', content: '+965 88889999' },
            { title: 'Албан тушаал', content: 'Жолооч' },
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
        setName={setName}
        name={name}
        surname={surname}
        setSurname={setSurname}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  )
}
