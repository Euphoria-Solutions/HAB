import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import CheckBox from '@react-native-community/checkbox'
import { useTheme } from '../../theme/theme-provider'
import { LoginInput, SubmitButton } from '../../components/common'
import { useAuth } from '../../auth/auth-provider'

type LoginScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Login'>
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const { signIn, user } = useAuth()
  const [rememberPass, setRememberPass] = useState(false)
  const [emailConfirm, setEmailConfirm] = useState(false)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passError, setPassError] = useState('')
  const [loading, setLoading] = useState(false)

  const submitInfo = () => {
    setEmailError('')
    setPassError('')
    if (!email) {
      setEmailError('Нэвтрэх нэрээ оруулна уу')
      return
    }
    if (!pass) {
      setPassError('Нууц үгээ оруулна уу')
      return
    }
    if (email != 'Zedude') {
      setEmailError('Нэвтрэх нэр буруу байна')
      return
    }
    if (pass != '123') {
      setEmailConfirm(true)
      setPassError('Нууц үг буруу байна')
      return
    }
    setLoading(true)
    signIn(email, pass, 'Насанжаргал', 'Төмөрцог')
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const handleCheckbox = () => {
    setRememberPass(prev => !prev)
  }
  const handleNavigate = () => {
    if (user?.job == 'manager') {
      navigation.reset({
        index: 1,
        routes: [{ name: 'TransportManager' }],
      })
    } else if (user?.job == 'mechanic') {
      navigation.reset({
        index: 1,
        routes: [{ name: 'MechanicEngineer' }],
      })
    } else if (user?.job == 'driver') {
      navigation.reset({
        index: 1,
        routes: [{ name: 'Driver' }],
      })
    } else {
      navigation.reset({
        index: 1,
        routes: [{ name: 'HABEngineer' }],
      })
    }
  }

  const styles = StyleSheet.create({
    body: {
      backgroundColor: theme.bg,
      height: '100%',
      justifyContent: 'center',
    },
    checkbox: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      height: 20,
    },
    checkboxContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    checkboxText: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '600',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 480,
      justifyContent: 'space-between',
      maxHeight: 480,
      paddingHorizontal: 20,
    },
    form: {
      gap: 24,
    },
    formAndLogo: {
      gap: 58,
    },
    logo: {
      backgroundColor: theme.grey500,
      height: 82,
      width: 161,
    },
    logoContainer: {
      alignItems: 'center',
      width: '100%',
    },
    moreAboutPassword: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    passwordButton: {
      color: theme.red,
      fontSize: 14,
      fontWeight: '500',
    },
  })

  return (
    <View style={styles.body}>
      <View style={styles.container}>
        <View style={styles.formAndLogo}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text>Zedude is cool</Text>
            </View>
          </View>
          <View style={styles.form}>
            <LoginInput
              value={email}
              setValue={setEmail}
              error={emailError}
              setError={setEmailError}
              label='Нэвтрэх нэр'
              confirmActive={emailConfirm}
              setConfirmActive={setEmailConfirm}
              editable={!loading}
            />
            <LoginInput
              value={pass}
              setValue={setPass}
              error={passError}
              setError={setPassError}
              label='Нууц үг'
              editable={!loading}
              password
            />
            {/* More Buttons */}
            <View style={styles.moreAboutPassword}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  disabled={loading}
                  onPress={handleCheckbox}
                  style={styles.checkbox}
                >
                  <CheckBox
                    style={styles.checkbox}
                    value={rememberPass}
                    boxType='square'
                    onCheckColor='white'
                    tintColor={theme.grey500}
                    animationDuration={0.2}
                    onFillColor='#34C759'
                    onTintColor='transparent'
                  />
                </TouchableOpacity>
                <Pressable onPress={handleCheckbox}>
                  <Text style={styles.checkboxText}>Сануулах</Text>
                </Pressable>
              </View>
              <TouchableOpacity disabled={loading}>
                <Text style={styles.passwordButton}>Нууц үг сэргээх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <SubmitButton
          onSubmit={handleNavigate}
          onPress={submitInfo}
          loading={loading}
          title='Нэвтрэх'
        />
      </View>
    </View>
  )
}
