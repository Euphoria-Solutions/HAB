import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import LoginInput from '../../components/common/login-input'
import { ConfirmIcon } from '../../assets/icons/confirm-icon'
import SubmitButton from '../../components/common/submit-button'

type ChangeProps = {
  navigation: NavigationProp<RootStackParamList, 'ChangePassword'>
}

const ChangePasswordScreen: React.FC<ChangeProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [oldPass, setOldPass] = useState('')
  const [oldPassError, setOldPassError] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPassError, setNewPassError] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [confirmPassError, setConfirmPassError] = useState('')
  const [charMinMet, setCharMinMet] = useState(false)
  const [capitalMet, setCapitalMet] = useState(false)
  const [loading, setLoading] = useState(false)

  const handlePress = () => {
    if (!oldPass) {
      setOldPassError('Нууц үгээ оруулна уу')
      return
    }
    if (!newPass) {
      setNewPassError('Нууц үгээ оруулна уу')
      return
    }
    if (!confirmPass) {
      setConfirmPassError('Нууц үгээ оруулна уу')
      return
    }
    if (oldPass != '123') {
      setOldPassError('Нууц үг таарахгүй байна / Нууц үгээ оруулна уу')
      return
    }
    if (!charMinMet || !capitalMet) {
      setNewPassError('Тэмдэгт холилдсон')
      return
    }
    if (confirmPass != newPass) {
      setConfirmPassError('Нууц үг таарахгүй байна')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const handleSubmit = () => {
    navigation.goBack()
  }

  useEffect(() => {
    if (newPass.length >= 8) {
      setCharMinMet(true)
    } else {
      setCharMinMet(false)
    }

    if (/[A-Z]/.test(newPass) && /[a-z]/.test(newPass)) {
      setCapitalMet(true)
    } else {
      setCapitalMet(false)
    }
  }, [newPass])

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      justifyContent: 'space-between',
      paddingTop: 0,
      padding: 20,
    },
    formContainer: {
      gap: 22,
    },
    indicator: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    indicatorActive: {
      alignItems: 'center',
      backgroundColor: theme.green,
      borderRadius: 9,
      height: 18,
      justifyContent: 'center',
      width: 18,
    },
    indicatorContainer: {
      gap: 8,
    },
    indicatorIcon: {
      color: theme.text,
      width: 9,
    },
    indicatorIconHide: {
      display: 'none',
    },
    indicatorInactive: {
      borderColor: theme.lightBg,
      borderRadius: 9,
      borderWidth: 2,
      height: 18,
      width: 18,
    },
    indicatorText: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '600',
    },
  })
  const charMinIndicatorStyle = charMinMet
    ? styles.indicatorActive
    : styles.indicatorInactive
  const charMinIconStyle = charMinMet
    ? styles.indicatorIcon
    : styles.indicatorIconHide
  const capitalIndicatorStyle = capitalMet
    ? styles.indicatorActive
    : styles.indicatorInactive
  const capitalIconStyle = capitalMet
    ? styles.indicatorIcon
    : styles.indicatorIconHide

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <LoginInput
            error={oldPassError}
            setError={setOldPassError}
            value={oldPass}
            setValue={setOldPass}
            password
            editable={!loading}
            label='Хуучин нууц үг'
          />
          <LoginInput
            error={newPassError}
            setError={setNewPassError}
            value={newPass}
            setValue={setNewPass}
            password
            editable={!loading}
            label='Шинэ нууц үг'
          />
          <LoginInput
            error={confirmPassError}
            setError={setConfirmPassError}
            value={confirmPass}
            setValue={setConfirmPass}
            password
            editable={!loading}
            label='Шинэ нууц үг давтах'
          />
          <View style={styles.indicatorContainer}>
            <View style={styles.indicator}>
              <View style={charMinIndicatorStyle}>
                <ConfirmIcon style={charMinIconStyle} />
              </View>
              <Text style={styles.indicatorText}>
                8 болон түүнээс дээш оронтой
              </Text>
            </View>
            <View style={styles.indicator}>
              <View style={capitalIndicatorStyle}>
                <ConfirmIcon style={capitalIconStyle} />
              </View>
              <Text style={styles.indicatorText}>Том жижиг үсэг орсон</Text>
            </View>
          </View>
        </View>
        <SubmitButton
          onSubmit={handleSubmit}
          loading={loading}
          onPress={handlePress}
          title='Хадгалах'
        />
      </View>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
