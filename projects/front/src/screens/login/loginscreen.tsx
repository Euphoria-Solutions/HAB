import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import CheckBox from '@react-native-community/checkbox'
import { useTheme } from '../../theme/theme-provider'
import LoginInput from '../../components/common/login-input'
import LottieView from 'lottie-react-native'

type LoginScreenProps = {
  navigation: NavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const animationRef = useRef<LottieView>(null)
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
    //email incorrect
    if (email != 'Zedude') {
      setEmailError('Нэвтрэх нэр буруу байна')
      return
    }
    //email confirm
    setEmailConfirm(true)
    //password incorrect
    if (pass != '123') {
      setPassError('Нууц үг буруу байна')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigation.navigate('Home')
    }, 3000)
  }
  const handleCheckbox = () => {
    setRememberPass(prev => !prev)
  }

  useEffect(() => {
    if (animationRef.current != null) {
      if (loading) {
        // Start the loading animation when isLoading is true
        animationRef.current.play()
      } else {
        // Reset the animation when isLoading is false
        navigation.navigate('Home')
        animationRef.current.reset()
      }
    }
  }, [loading])

  const styles = StyleSheet.create({
    body: {
      backgroundColor: theme.background,
      height: '100%',
      justifyContent: 'center',
    },
    checkbox: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      height: 20,
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
    loginButton: {
      alignItems: 'center',
      backgroundColor: theme.primary,
      borderRadius: 24,
      padding: 15,
    },
    loginText: {
      color: theme.background,
      fontSize: 18,
      fontWeight: '600',
    },
    logo: {
      backgroundColor: theme.gray,
      height: 82,
      width: 161,
    },
    logoContainer: {
      alignItems: 'center',
      width: '100%',
    },
    lottieLoading: {
      height: 22,
      width: 22,
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
          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text>Zedude is cool</Text>
            </View>
          </View>
          {/* Form */}
          <View style={styles.form}>
            {/* Inputs */}
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
                  tintColor={theme.gray}
                  animationDuration={0.2}
                  onFillColor='#34C759'
                  onTintColor='transparent'
                />
                <Text style={styles.checkboxText}>Сануулах</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={loading}>
                <Text style={styles.passwordButton}>Нууц үг сэргээх</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Login button */}
        <TouchableOpacity disabled={loading} onPress={submitInfo}>
          <View style={styles.loginButton}>
            {loading ? (
              <LottieView
                style={styles.lottieLoading}
                ref={animationRef}
                source={require('../../assets/lotties/loading-animation.json')}
                autoPlay={false}
                loop={true}
              />
            ) : (
              <Text style={styles.loginText}>Нэвтрэх</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen
