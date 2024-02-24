import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import LoginInput from '../../components/common/login-input'
import SubmitButton from '../../components/common/submit-button'

type RequestProps = {
  navigation: NavigationProp<RootStackParamList, 'Request'>
}

const RequestScreen: React.FC<RequestProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [username, setUsername] = useState('')
  const [position, setPosition] = useState('')
  const [requestText, setRequestText] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePress = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const handleSubmit = () => {
    navigation.goBack()
  }

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
    textArea: {
      flexGrow: 1,
      height: 270,
      padding: 18,
      paddingTop: 18,
    },
    textAreaContainer: {
      gap: 12,
    },
    textAreaCount: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '500',
      textAlign: 'right',
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <LoginInput
            value={username}
            setValue={setUsername}
            editable={!loading}
            label='Нэр:'
          />
          <LoginInput
            value={position}
            setValue={setPosition}
            editable={!loading}
            label='Албан тушаал:'
          />
          <View style={styles.textAreaContainer}>
            <LoginInput
              multiline
              maxLength={500}
              style={styles.textArea}
              value={requestText}
              setValue={setRequestText}
              editable={!loading}
              label='Санал хүсэлт:'
            />
            <Text style={styles.textAreaCount}>{requestText.length}/500</Text>
          </View>
        </View>
        <SubmitButton
          disabled={!requestText}
          onSubmit={handleSubmit}
          loading={loading}
          onPress={handlePress}
          title='Хадгалах'
        />
      </View>
    </SafeAreaView>
  )
}

export default RequestScreen
