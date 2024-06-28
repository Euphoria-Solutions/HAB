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
import { useWork } from '../../services/work-provder'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  EDIT_PRESCRIPTION,
  EDIT_MECHANIC_CHECK_LIST,
  EDIT_WORK,
  GET_WORKS,
} from '../../graphql'

type CarConfirmProps = {
  data?: DataType
}

type workState = {
  vehicle: string
  delivery: string
  mechanicCheckList: string
  prescription: string
  mechanicEngineerConfirmation: string
  habEngineerConfirmation: string
  driverConfirmation: string
  progress: string
  managerState: string
  state: string
}

export const CarConfirm: React.FC<CarConfirmProps> = ({ data }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const navigation =
    useNavigation<BottomTabNavigationProp<RootWorkStackParamList, 'Info'>>()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState('')
  const [workState, setWorkState] = useState<workState>()
  const [disabled, setDisabled] = useState(false)
  const { workData, workId, mechanic, prescription } = useWork()
  const [editWork] = useMutation(EDIT_WORK)
  const [workUpdateInformation, setWorkUpdateInformation] = useState<DataType>()
  const [editMechanicCheckList] = useMutation(EDIT_MECHANIC_CHECK_LIST)
  const [editPrescription] = useMutation(EDIT_PRESCRIPTION)
  const [getWork] = useLazyQuery(GET_WORKS)

  useEffect(() => {
    setWorkUpdateInformation(workData.find(work => work._id === workId))
    const getWorkState = async () => {
      const { data: workStateData } = await getWork({
        variables: {
          _id: workUpdateInformation?._id,
        },
      })
      setWorkState(workStateData.getWorks[0])
    }
    getWorkState()
    switch (user?.job) {
      case 'driver':
        if (
          workState?.mechanicEngineerConfirmation == '' ||
          workState?.habEngineerConfirmation == ''
        ) {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
        break
      case 'engineer':
        if (workState?.mechanicEngineerConfirmation == '') {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
        break
      case 'manager':
        if (
          workState?.mechanicEngineerConfirmation == '' ||
          workState?.habEngineerConfirmation == '' ||
          workState?.driverConfirmation == ''
        ) {
          setDisabled(true)
        } else {
          setDisabled(false)
        }
    }
  }, [workData])

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
  const managerCase = async () => {
    console.log('manager')
    const { data: managerData } = await editWork({
      variables: {
        id: workId,
        vehicle: workUpdateInformation?.license,
        delivery: workUpdateInformation?.contractNumber,
        mechanicCheckList: workUpdateInformation?.mechanicCheckList,
        prescription: workUpdateInformation?.prescription,
        mechanicEngineerConfirmation: 'confirmed',
        habEngineerConfirmation: 'confirmed',
        driverConfirmation: 'confirmed',
        progress: '3/3',
        managerState: 'delivered',
        state: 'finished',
      },
    })
    if (managerData) {
      navigation.navigate('Main')
    }
  }

  const mechanicCase = async () => {
    console.log('mechanic', mechanic)
    const { data: mechanicList } = await editMechanicCheckList({
      variables: {
        id: mechanic?._id,
        data: mechanic?.data,
        problem: mechanic?.problem,
        mechanicEngineer: user?._id,
        vehicle: mechanic?.vehicle,
      },
    })
    const { data: mechanicData } = await editWork({
      variables: {
        _id: workId,
        vehicle: workUpdateInformation?.license,
        delivery: workUpdateInformation?.contractNumber,
        mechanicCheckList: mechanic?._id,
        prescription: workUpdateInformation?.prescription,
        mechanicEngineerConfirmation: 'confirmed',
        habEngineerConfirmation: '',
        driverConfirmation: '',
        progress: '1/3',
        managerState: 'mechanic',
        state: 'waiting',
      },
    })
    if (mechanicData && mechanicList) {
      navigation.navigate('Main')
    }
  }

  const engineerCase = async () => {
    const { data: engineerPrescription } = await editPrescription({
      variables: {
        prescription,
      },
    })
    const variables = {
      id: workId,
      vehicle: workUpdateInformation?.license,
      delivery: workUpdateInformation?.contractNumber,
      mechanicCheckList: workUpdateInformation?.mechanicCheckList,
      prescription: workUpdateInformation?.prescription,
      mechanicEngineerConfirmation: 'confirmed',
      habEngineerConfirmation: 'confirmed',
      driverConfirmation: '',
      progress: '2/3',
      managerState: 'confirmed',
      state: 'waiting',
    }
    const { data: engineerData } = await editWork({
      variables: variables,
    })

    console.log('variables', variables)
    if (engineerPrescription && engineerData) {
      navigation.navigate('Main')
    }
  }

  const driverCase = async () => {
    console.log('driver')
    const { data: engineerData } = await editWork({
      variables: {
        id: workId,
        vehicle: workUpdateInformation?.license,
        delivery: workUpdateInformation?.contractNumber,
        mechanicCheckList: workUpdateInformation?.mechanicCheckList,
        prescription: workUpdateInformation?.prescription,
        mechanicEngineerConfirmation: 'confirmed',
        habEngineerConfirmation: 'confirmed',
        driverConfirmation: 'confirmed',
        progress: '2/3',
        managerState: 'confirmed',
        state: 'being processed',
      },
    })
    if (engineerData) {
      navigation.navigate('Main')
    }
  }

  const handleSubmit = () => {
    if (user) {
      switch (user?.job) {
        case 'manager':
          managerCase()
          break
        case 'driver':
          driverCase()
          break
        case 'mechanic':
          mechanicCase()
          break
        case 'engineer':
          engineerCase()
          break
      }
    }
    navigation.navigate('Main')
  }
  const getJob = () => {
    if (user) {
      switch (user.job) {
        case 'manager':
          return 'Хянсан тээвэр зохицуулагч:'
        case 'mechanic':
          return 'Гүйцэтгэсэн механик инженер:'
        case 'driver':
          return 'Жолооч'
        case 'engineer':
          return 'ХАБ Инженер'
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
        {user?.job == 'manager' && state != 'finished' && (
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
        )}
        {user?.job == 'mechanic' && (
          <>
            <Indicator
              title='Мэдээлэл бүрэн, зөв'
              size={18}
              state={state == 'finished' ? 'finished' : 'empty'}
            />
            <Indicator title='Гарын үсэг зурсан' size={18} state='empty' />
            {/* {state != 'finished' && (
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
            )} */}
          </>
        )}
      </View>
      <SubmitButton
        disabled={disabled}
        loading={loading}
        onSubmit={handleSubmit}
        onPress={handlePress}
        title='Баталгажуулах'
      />
    </View>
  )
}
