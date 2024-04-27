import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import {
  ChangeProfilePicture,
  LoginInput,
  SubmitButton,
} from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { CustomDropdown } from '../../components/custom'
import { SigninIcon, UserIcon } from '../../assets/icons'
import { useNav } from '../../navigation'
import { workerData } from '../../utils'

interface IAdminAddWorkers {
  navigation: StackNavigationProp<RootAdminStackParamList, 'AddWorker'>
}

export const AdminAddWorkers: React.FC<IAdminAddWorkers> = ({ navigation }) => {
  const { theme } = useTheme()
  const { id, setId } = useNav()
  const [curId, setCurId] = useState('')
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(-150)
  const [surname, setSurname] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')
  const [job, setJob] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setId('')
    })
    return unsubscribe
  }, [navigation])
  useEffect(() => {
    if (id) {
      setCurId(id)
      const temp = workerData.find(e => e.id == id)
      setJob(temp?.job ?? '')
      setNumber(temp?.mobileNumber.toString() ?? '')
      setName(temp?.name ?? '')
      setSurname(temp?.surname ?? '')
      setUsername(temp?.username ?? '')
      navigation.setOptions({
        title: 'Засах',
      })
    }
  }, [id])

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const handleDropdown = (val: { value: string }) => {
    setJob(val.value)
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    contentStyle: {
      gap: 16,
      paddingBottom: 40,
      zIndex: -1,
    },
    iconStyle: {
      color: theme.text,
    },
    showBehind: {
      zIndex: -1,
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 16,
      zIndex: -1,
    },
    titleContainer: {
      flexDirection: 'row',
      gap: 12,
      zIndex: -1,
    },
  })

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={offset}
        contentContainerStyle={styles.contentStyle}
      >
        {curId && <ChangeProfilePicture />}
        <View style={styles.titleContainer}>
          <UserIcon style={styles.iconStyle} />
          <Text style={styles.title}>Хувийн мэдээлэл</Text>
        </View>
        <LoginInput
          clearButton
          label='Овог'
          value={surname}
          setValue={setSurname}
        />
        <LoginInput clearButton label='Нэр' value={name} setValue={setName} />
        <LoginInput
          clearButton
          label='Утасны дугаар'
          keyboardType='number-pad'
          value={number}
          setValue={setNumber}
        />
        <CustomDropdown
          onSelect={handleDropdown}
          label='Албан тушаал'
          value={job}
          options={[
            {
              label: 'ХАБЭА ажилтан',
              value: 'engineer',
            },
            {
              label: 'Жолооч',
              value: 'driver',
            },
            {
              label: 'Механик инженер',
              value: 'mechanic',
            },
          ]}
        />
        <View style={styles.titleContainer}>
          <SigninIcon style={styles.iconStyle} />
          <Text style={styles.title}>Нэвтрэх бүртгэл</Text>
        </View>
        <LoginInput
          clearButton
          onFocus={() => setOffset(100)}
          onBlur={() => setOffset(-150)}
          label='Нэвтрэх нэр'
          value={username}
          setValue={setUsername}
        />
        <SubmitButton
          onPress={handleSubmit}
          loading={loading}
          onSubmit={() => navigation.goBack()}
          title='Хадгалах'
          style={styles.showBehind}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
