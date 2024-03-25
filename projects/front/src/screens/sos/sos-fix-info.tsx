import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { RootSOSStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { LoginInput, SubmitButton } from '../../components/common'
import { CustomDropdown } from '../../components/custom'

type SOSFixInfoProps = {
  navigation: BottomTabNavigationProp<RootSOSStackParamList, 'FixInfo'>
}

export const SOSFixInfo: React.FC<SOSFixInfoProps> = ({ navigation }) => {
  const { theme } = useTheme()
  const [personOne, setPersonOne] = useState('')
  const [numberOne, setNumberOne] = useState('')
  const [personTwo, setPersonTwo] = useState('')
  const [numberTwo, setNumberTwo] = useState('')
  const [allergies, setAllergies] = useState('')
  const [medicine, setMedicine] = useState('')
  const [bloodType, setBloodType] = useState({ value: '', label: '' })
  const [loading, setLoading] = useState(false)

  const handlePress = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  const handleSubmit = () => {
    navigation.goBack()
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 24,
      height: '100%',
      padding: 20,
    },
    sectionOne: {
      gap: 16,
    },
    sectionTwo: {
      gap: 14,
      marginBottom: 134,
      marginTop: 26,
    },
    submitButtonStyle: {
      bottom: 0,
      flex: 1,
      marginBottom: 24,
      paddingHorizontal: 20,
      position: 'absolute',
      width: '100%',
    },
    textArea: {
      flexGrow: 1,
      height: 106,
      padding: 16,
      paddingTop: 16,
    },
    textAreaCounter: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 12,
      marginTop: 10,
      textAlign: 'right',
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
    },
  })

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.sectionOne}>
          <Text style={styles.title}>1.1 Гэр бүлийн хүмүүсийн мэдээлэл</Text>
          <LoginInput
            label='Холбоо барих хүн 1:'
            value={personOne}
            setValue={setPersonOne}
          />
          <LoginInput
            label='Утасны дугаар'
            value={numberOne}
            setValue={setNumberOne}
          />
          <LoginInput
            label='Холбоо барих хүн 2:'
            value={personTwo}
            setValue={setPersonTwo}
          />
          <LoginInput
            label='Утасны дугаар'
            value={numberTwo}
            setValue={setNumberTwo}
          />
        </View>
        <View style={styles.sectionTwo}>
          <Text style={styles.title}>1.2 Таны хувийн мэдээлэл</Text>
          <CustomDropdown
            label='Цусний бүлэг'
            value={bloodType}
            onSelect={e => setBloodType(e)}
            placeholder='Мэдээлэл оруулах'
            options={[
              { value: 'a', label: 'A буюу II бүлэг' },
              { value: 'b', label: 'B буюу III бүлэг' },
              { value: 'o', label: 'O буюу I бүлэг' },
              { value: 'ab', label: 'AB буюу IV бүлэг' },
              { value: '', label: 'Мэдэхгүй' },
            ]}
          />
          <View>
            <LoginInput
              placeholder='Мэдээлэл оруулах'
              value={allergies}
              setValue={setAllergies}
              style={styles.textArea}
              label='Харшилдаг зүйлс'
              multiline
              maxLength={200}
            />
            <Text style={styles.textAreaCounter}>{allergies.length}/200</Text>
          </View>
          <View>
            <LoginInput
              placeholder='Мэдээлэл оруулах'
              value={medicine}
              setValue={setMedicine}
              style={styles.textArea}
              label='Тогтмол уудаг эм'
              multiline
              maxLength={200}
            />
            <Text style={styles.textAreaCounter}>{medicine.length}/200</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitButtonStyle}>
        <SubmitButton
          onPress={handlePress}
          onSubmit={handleSubmit}
          loading={loading}
          title='Хадгалах'
        />
      </View>
    </View>
  )
}
