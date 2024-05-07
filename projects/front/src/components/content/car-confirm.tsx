import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DataType } from '../../utils/interface'
import {
  Indicator,
  ListContainer,
  SignatureCard,
  SubmitButton,
} from '../common'
import { useTheme } from '../../theme/theme-provider'
import { useNavigation } from '@react-navigation/native'
import { RootWorkStackParamList } from '../../navigation/types'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { carProblemData } from '../../utils/temp-datas'
import { useAuth } from '../../auth/auth-provider'

type CarConfirmProps = {
  data?: DataType
}

export const CarConfirm: React.FC<CarConfirmProps> = ({ data }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const navigation =
    useNavigation<BottomTabNavigationProp<RootWorkStackParamList, 'Info'>>()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')

  useEffect(() => {
    if (data) {
      setState(data.state)
    }
  }, [data])

  const handleNavigateReason = () => {
    navigation.navigate('Reason', { data: carProblemData })
  }
  const handlePress = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const handleSubmit = () => {
    navigation.navigate('Main')
  }
  const getJob = () => {
    if (user) {
      switch (user.job) {
        case 'manager':
          return 'Хянсан тээвэр зохицуулагч:'
        case 'mechanic':
          return 'Гүйцэтгэсэн механик инженер:'
        default:
          return ''
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      justifyContent: 'space-between',
    },
    contentContainer: {
      gap: 12,
    },
    listStyle: {
      marginTop: 30,
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
      paddingHorizontal: 8,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {state == 'finished' ? 'Баталгаажуулалт:' : 'Асуудал гарсан'}
        </Text>
        {user && (
          <SignatureCard
            cardView
            name={user?.lastname + ' ' + user?.firstname}
            job={getJob() ?? ''}
          />
        )}
        {user?.job == 'manager' ? (
          state != 'finished' && (
            <>
              <Indicator
                title='Мэдээлэл бүрэн, зөв'
                size={18}
                state={state == 'finished' ? 'finished' : 'empty'}
              />
              <Indicator title='Гарын үсэг зурсан' size={18} state='empty' />
              <ListContainer
                style={styles.listStyle}
                items={[
                  {
                    title: 'Шалтгаан үзэх',
                    content: 'default',
                    onPress: handleNavigateReason,
                  },
                ]}
              />
            </>
          )
        ) : (
          <>
            <Indicator
              title='Мэдээлэл бүрэн, зөв'
              size={18}
              state={state == 'finished' ? 'finished' : 'empty'}
            />
            <Indicator title='Гарын үсэг зурсан' size={18} state='empty' />
            {state != 'finished' && (
              <ListContainer
                style={styles.listStyle}
                items={[
                  {
                    title: 'Шалтгаан бөглөх',
                    content: 'default',
                    onPress: handleNavigateReason,
                  },
                ]}
              />
            )}
          </>
        )}
      </View>
      <SubmitButton
        loading={loading}
        onSubmit={handleSubmit}
        onPress={handlePress}
        title='Баталгажуулах'
      />
    </View>
  )
}
