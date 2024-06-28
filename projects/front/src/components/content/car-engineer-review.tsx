import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LoginInput } from '../common'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PlusIcon } from '../../assets/icons'
import { useWork } from '../../services/work-provder'

export const CarReview: React.FC = () => {
  const { theme } = useTheme()
  const [requirements, setRequirements] = useState<string[]>([])
  const [instructions, setInstructions] = useState<string[]>([])
  const [value, setValue] = useState('')
  const { setPrescription } = useWork()

  useEffect(() => {
    setPrescription({
      intructions: instructions,
      responsibilities: requirements,
    })
  }, [requirements, instructions])

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.lightBg,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 15,
      padding: 15,
    },
    container: {
      height: '100%',
      justifyContent: 'space-between',
    },
    contentContainer: {
      gap: 12,
    },
    inputStyle: {
      height: 164,
      paddingTop: 16,
    },
    subContainer: {
      gap: 8,
    },
    text: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
      height: 20,
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
      paddingHorizontal: 8,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Гүйцэтгэх ажил, хариуцлага</Text>
          {requirements.map((e, i) => {
            return (
              <LoginInput
                key={i}
                value={e}
                setValue={e => {
                  setRequirements(prev =>
                    prev.map((el, indx) => {
                      if (indx == i) {
                        return e
                      } else {
                        return el
                      }
                    })
                  )
                }}
              />
            )
          })}
          <TouchableOpacity
            onPress={() => setRequirements(prev => [...prev, ''])}
            style={styles.button}
          >
            <PlusIcon style={styles.text} />
            <Text style={styles.text}>Шинэ мэдээлэл нэмэх</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Гүйцэтгэх ажил, хариуцлага</Text>
          {instructions.map((e, i) => {
            return (
              <LoginInput
                key={i}
                value={e}
                setValue={e => {
                  setInstructions(prev =>
                    prev.map((el, indx) => {
                      if (indx == i) {
                        return e
                      } else {
                        return el
                      }
                    })
                  )
                }}
              />
            )
          })}
          <TouchableOpacity
            onPress={() => setInstructions(prev => [...prev, ''])}
            style={styles.button}
          >
            <PlusIcon style={styles.text} />
            <Text style={styles.text}>Шинэ мэдээлэл нэмэх</Text>
          </TouchableOpacity>
        </View>
        <LoginInput
          style={styles.inputStyle}
          placeholder='Мэдээлэл бичих'
          value={value}
          setValue={setValue}
          multiline
          label='ХАБ-н нэмэлт зөвлөмж'
        />
      </View>
    </View>
  )
}
