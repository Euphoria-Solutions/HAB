import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { CustomDropdown, CustomModal } from '../custom'
import { LoginInput } from './login-input'
import { SubmitButton } from './submit-button'
// import { useMutation } from '@apollo/client'
// import { CHANGE_REQUEST, CREATE_NOTIFICATION } from '../../graphql'

type jobType = {
  value: string
  label: string
}

type ProfileFixInfoProps = {
  modalVisible: boolean
  setModalVisible: (_v: boolean) => void
  lastname: string
  setLastname: (_v: string) => void
  firstname: string
  setFirstname: (_v: string) => void
  number: string
  setNumber: (_v: string) => void
  job: jobType
  setJob: (_v: jobType) => void
  reason: string
  setReason: (_v: string) => void
}

export const ProfileFixInfo: React.FC<ProfileFixInfoProps> = ({
  modalVisible,
  setModalVisible,
  lastname,
  setLastname,
  firstname,
  setFirstname,
  number,
  setNumber,
  job = { value: '', label: '' },
  setJob,
  reason,
  setReason,
}) => {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [keyboardAvoid, setKeyboardAvoid] = useState(0)
  // const { sendNotification } = useMutation(CREATE_NOTIFICATION)

  const handleSubmit = async () => {
    setLoading(true)
    // const { data: requestData } = requestToChange({
    //   variables: {
    //     request
    //   }
    // })
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
    inputContainer: {
      gap: 20,
      paddingBottom: 20,
    },
    reasonCount: {
      color: theme.text,
      fontFamily: theme.commi500,
      fontSize: 12,
      textAlign: 'right',
    },
  })

  return (
    <CustomModal
      title='Хэрэглэгчийн мэдээлэл засах хүсэлт'
      visible={modalVisible}
      setVisible={setModalVisible}
      keyboardAvoidValue={keyboardAvoid}
    >
      <View style={styles.inputContainer}>
        <LoginInput
          onFocus={() => setKeyboardAvoid(-340)}
          label='Таны овог'
          value={lastname}
          setValue={setLastname}
        />
        <LoginInput
          onFocus={() => setKeyboardAvoid(-240)}
          label='Таны нэр'
          value={firstname}
          setValue={setFirstname}
        />
        <LoginInput
          onFocus={() => setKeyboardAvoid(-140)}
          label='Утасны дугаар'
          value={number}
          setValue={setNumber}
        />
        <CustomDropdown
          position='above'
          label='Албан тушаал'
          value={job}
          onSelect={e => setJob(e)}
          placeholder='Мэдээлэл оруулах'
          options={[
            { value: 'driver', label: 'Жолооч' },
            { value: 'mechanic', label: 'Механик' },
            { value: 'teever_zuuch', label: 'Тээвэр Зохицуулагч' },
            { value: 'engineer', label: 'ХАБ Инженер' },
          ]}
        />
        <LoginInput
          onFocus={() => setKeyboardAvoid(-40)}
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
  )
}
