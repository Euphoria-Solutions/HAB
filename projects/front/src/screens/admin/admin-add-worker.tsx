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
import { useLazyQuery, useMutation } from '@apollo/client'
import { ADD_USER, EDIT_USER, GET_USERS } from '../../graphql'
import { WorkerType } from '../../utils'

interface IAdminAddWorkers {
  navigation: StackNavigationProp<RootAdminStackParamList, 'AddWorker'>
}

export const AdminAddWorkers: React.FC<IAdminAddWorkers> = ({ navigation }) => {
  const { theme } = useTheme()
  const { id, setId } = useNav()
  const [curId, setCurId] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastname, setLastame] = useState('')
  const [firstname, setFirstame] = useState('')
  const [username, setUsername] = useState('')
  const [number, setNumber] = useState('')
  const [job, setJob] = useState('')
  const [password, setPassword] = useState('')
  const [addUser] = useMutation(ADD_USER)
  const [editUser] = useMutation(EDIT_USER)

  const [getWorkerData] = useLazyQuery(GET_USERS)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setId('')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (id) {
      const fetchWorkerData = async () => {
        setCurId(id)
        try {
          const { data } = await getWorkerData({
            variables: { _id: id },
          })
          let temp = data?.getUsers.filter((user: WorkerType) => user._id == id)
          temp = temp[0]
          setJob(temp?.job ?? '')
          setNumber(temp?.phoneNumber?.toString() ?? '')
          setFirstame(temp?.firstname ?? '')
          setLastame(temp?.lastname ?? '')
          setUsername(temp?.username ?? '')
          navigation.setOptions({
            title: 'Засах',
          })
        } catch (error) {
          console.log('Error fetching worker data:', error)
        }
      }
      fetchWorkerData()
    }
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const variables = {
        username,
        firstname,
        lastname,
        job,
        phoneNumber: number,
        password: password || '12345678',
      }

      if (curId) {
        await editUser({ variables: { ...variables, id: curId } })
      } else {
        await addUser({ variables })
      }
      navigation.goBack()
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
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
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
      <ScrollView style={styles.container}>
        <View style={styles.contentStyle}>
          {curId && <ChangeProfilePicture />}
          <View style={styles.titleContainer}>
            <UserIcon style={styles.iconStyle} />
            <Text style={styles.title}>Хувийн мэдээлэл</Text>
          </View>
          <LoginInput
            clearButton={curId ? true : false}
            label='Овог'
            value={lastname}
            setValue={setLastame}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Нэр'
            value={firstname}
            setValue={setFirstame}
          />
          <LoginInput
            clearButton={curId ? true : false}
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
            clearButton={curId ? true : false}
            label='Нэвтрэх нэр'
            value={username}
            setValue={setUsername}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Нууц үг'
            secureTextEntry
            value={password}
            setValue={setPassword}
          />
          <SubmitButton
            onPress={handleSubmit}
            loading={loading}
            onSubmit={() => navigation.goBack()}
            title='Хадгалах'
            style={styles.showBehind}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
