import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { DatePick, LoginInput, SubmitButton } from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { CustomDropdown } from '../../components/custom'
import { PackageIcon, TruckOutlinedIcon } from '../../assets/icons'
import { useNav } from '../../navigation'
import { CarInfoType, DataType, ScheduleType, WorkerType } from '../../utils'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import {
  ADD_MECHNIC_CHECK_LIST,
  ADD_PRESCRIPTION,
  CREATE_DELIVERY,
  CREATE_WORK,
  EDIT_DELIVERY,
  GET_DELIVERIES,
  GET_USERS,
  GET_VEHICLES,
} from '../../graphql'
import { useAuth } from '../../auth/auth-provider'

export const carEmptyInfo: CarInfoType[] = [
  {
    name: 'Хөргөлтийн радиатор, термостат, жалюз, юүлэх цоргоны бэхэлгээг шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Нүүрэвч, сэнсний хүрээ, сэнс, усны насос, духны тагны бэхэлгээг шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Дамжуулгын оосор, гинжин дамжуулгын голын тулгуурыг бэхэлгээг шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Клапангийн дулааны завсарыг шалгах тохируулах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Тосны тэвшний бэхэлгээг шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн ажиллагааны дууг электрон мэдрэгч бүхий чагнуураар чагнаж оношлох',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн тос болон шатахуун зарцуулалтыг шалгаж гэмтлийн шалтгааныг илрүүлэх',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Цилиндрийн даралтыг цилиндр бүр дээр компрессорметрээр шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Тосны шүүлтүүрийг шалгаж солих',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн блок, хурдны хайрцагт бэхлэгдсэн дискэн холбооны арьсны бэхэлгээг шалгах',
    state: 'waiting',
    type: 'disk',
    quality: '',
  },
  {
    name: 'Дискэн холбооны дөрөөний сул явалт, хөтлөгдөх, хөтлөх дискний элэгдэл, тотго муфтний элэгдэлийг шалгах, тохируулах',
    state: 'waiting',
    type: 'disk',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны тосны түвшин, тос бохирдлыг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны тосны түвшин, тос бохирдлыг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны араа залгах, салгах, механизмын ажиллагааг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хойд тэнхлэгийн тосны түвшин, битүүмжийг шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Ерөнхий дамжуулгын хөтлөх, хөтлөгдөх арааны харьцааг шалгах, редукторын ажиллагааг дуу чимээ, халаалтаар оношлох',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Хүч дамжуулах ангийн чадлын алдагдлыг тодорхойлох',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Хагас гол, дугуйн бэхэлгээ, булны тохиргоог шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Тосны тэвшний бэхэлгээг шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
]

export const mechanicCheckList = {
  data: carEmptyInfo,
  problem: {
    title: '',
    reason: '',
    parts: [
      {
        value: '',
        label: '',
      },
    ],
    images: '',
  },
  vehicle: '',
  mechanicEngineer: '',
}

export const prescription = {
  intructions: [''],
  responsibilities: [''],
}

interface IAdminAddSchedule {
  navigation: StackNavigationProp<RootAdminStackParamList, 'AddSchedule'>
}

export const AdminAddSchedule: React.FC<IAdminAddSchedule> = ({
  navigation,
}) => {
  const { theme } = useTheme()
  const { id, setId } = useNav()
  const [curId, setCurId] = useState('')
  const [loading, setLoading] = useState(false)
  const [contractNumber, setContractNumber] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState<Date>()
  const [pickupPoint, setPickupPoint] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [exitDate, setExitDate] = useState<Date>()
  const [companyName, setCompanyName] = useState('')
  const [driver, setDriver] = useState({ username: '' })
  const [license, setLicense] = useState('')
  const [trailerNumber1, setTrailerNumber1] = useState('')
  const [trailerNumber2, setTrailerNumber2] = useState('')
  const { user } = useAuth()

  const [addDelivery] = useMutation(CREATE_DELIVERY)
  const [editDelivery] = useMutation(EDIT_DELIVERY)
  const [getDeliveries] = useLazyQuery(GET_DELIVERIES)
  const [addMechanicCheckList] = useMutation(ADD_MECHNIC_CHECK_LIST)
  const [addPrescription] = useMutation(ADD_PRESCRIPTION)
  const {
    data: workerDatas,
    loading: workerLoading,
    error: workerError,
  } = useQuery(GET_USERS)
  const {
    data: vehicleDatas,
    loading: vehicleLoading,
    error: vehicleError,
  } = useQuery(GET_VEHICLES)
  const [generateWork] = useMutation(CREATE_WORK)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setId('')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (id) {
      const fetchDeliveries = async () => {
        setCurId(id)
        try {
          const { data } = await getDeliveries({ variables: { _id: id } })
          let temp = data?.getDeliveries.find(
            (delivery: ScheduleType) => delivery._id === id
          )
          temp = temp[0]
          if (temp) {
            setContractNumber(temp.contractNumber ?? '')
            setLocation(temp.location ?? '')
            setDate(temp.date ? new Date(temp.date) : undefined)
            setPickupPoint(temp.pickupPoint ?? '')
            setDeliveryLocation(temp.deliveryLocation ?? '')
            setExitDate(temp.exitDate ? new Date(temp.exitDate) : undefined)
            setDriver(temp.driver ?? { name: '' })
            setLicense(temp.license ?? '')
            setTrailerNumber1(temp.trailerNumber1 ?? '')
            setTrailerNumber2(temp.trailerNumber2 ?? '')
            setCompanyName(temp.companyName ?? '')
            navigation.setOptions({ title: 'Засах' })
          }
        } catch (error) {
          console.error('Error fetching delivery data:', error)
        }
      }
      fetchDeliveries()
    }
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const variables = {
        contractNumber: contractNumber,
        containerLocation: pickupPoint,
        location: location,
        deliveryLocation: deliveryLocation,
        organization: companyName,
        date: date?.toISOString() || '',
        departTime: exitDate?.toISOString() || '',
        addedBy: user ? user?._id : '',
        driver: driver.username,
        vehicle: license,
        trailerNumber1: trailerNumber1,
        trailerNumber2: trailerNumber2,
      }

      if (curId) {
        editDelivery({
          variables: { ...variables, id: curId },
        })
      } else {
        const { data: deliveryData } = await addDelivery({
          variables: variables,
        })

        const { data: mechanicListData } = await addMechanicCheckList({
          variables: {
            data: carEmptyInfo,
            problem: {
              name: '',
              title: '',
              reason: '',
              parts: [
                {
                  value: '',
                  label: '',
                },
              ],
              images: '',
            },
            vehicle: license,
            mechanicEngineer: '',
          },
        })

        const { data: prescriptionsListData } = await addPrescription({
          variables: {
            prescription,
          },
        })

        const workInput = {
          vehicle: license,
          delivery: variables.contractNumber,
          pickupPoint,
          mechanicCheckList: mechanicListData.createMechanicalCheckList,
          prescription: prescriptionsListData.addPrescription,
          mechanicEngineerConfirmation: '',
          habEngineerConfirmation: '',
          driverConfirmation: '',
          progress: '0/3',
          managerState: 'manager',
          state: 'waiting',
        }

        const { data: workData } = await generateWork({ variables: workInput })

        if (
          deliveryData &&
          workData &&
          mechanicListData &&
          prescriptionsListData
        ) {
          navigation.goBack()
        }
      }
    } catch (error) {
      console.error('Error creating delivery or work:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDriverOptions = () => {
    if (workerDatas && workerDatas.getUsers) {
      const workerData = workerDatas.getUsers.filter(
        (user: WorkerType) => user.job == 'driver'
      )
      return workerData.map((worker: WorkerType) => ({
        value: worker.username,
        label: `${worker.firstname} ${worker.lastname}`,
        icon: <View style={styles.profile} />,
      }))
    }
    return []
  }

  const getCarNumberOptions = () => {
    if (vehicleDatas && vehicleDatas.getVehicle) {
      return vehicleDatas.getVehicle.map((vehicle: DataType) => ({
        value: vehicle.license,
        label: vehicle.license,
      }))
    }
    return []
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
    profile: {
      backgroundColor: theme.text,
      borderRadius: 9,
      height: 18,
      width: 18,
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

  if (workerLoading || vehicleLoading) return <Text>loading ...</Text>
  if (workerError || vehicleError)
    return <Text>error occurred while taking datas</Text>

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
      <ScrollView style={styles.container}>
        <View style={styles.contentStyle}>
          <View style={styles.titleContainer}>
            <PackageIcon style={styles.iconStyle} />
            <Text style={styles.title}>Хүргэлтийн мэдээлэл</Text>
          </View>
          <LoginInput
            clearButton={!!curId}
            label='Гэрээний дугаар'
            value={contractNumber}
            setValue={setContractNumber}
          />
          <LoginInput
            clearButton={!!curId}
            label='Чингэлэг авах газар'
            value={pickupPoint}
            setValue={setPickupPoint}
          />
          <LoginInput
            clearButton={!!curId}
            label='Амны байршил'
            value={location}
            setValue={setLocation}
          />
          <LoginInput
            clearButton={!!curId}
            label='Хүргэж өгөх боомтны байршил'
            value={deliveryLocation}
            setValue={setDeliveryLocation}
          />
          <LoginInput
            clearButton={!!curId}
            label='Байгууллагийн нэр'
            value={companyName}
            setValue={setCompanyName}
          />
          <DatePick label='Он сар' value={date} setValue={setDate} />
          <DatePick
            mode='datetime'
            label='Гарах цаг'
            value={exitDate}
            setValue={setExitDate}
          />
          <View style={styles.titleContainer}>
            <TruckOutlinedIcon style={styles.iconStyle} />
            <Text style={styles.title}>Тээврийн хэрэгсэл болон жолооч</Text>
          </View>
          <CustomDropdown
            zIndex={1}
            position='above'
            value={driver.username}
            label='Жолооч'
            options={getDriverOptions()}
            onSelect={e => setDriver({ username: e.value })}
          />
          <CustomDropdown
            zIndex={2}
            position='above'
            value={license}
            label='Машины дугаар'
            options={getCarNumberOptions()}
            onSelect={e => {
              setLicense(e.value)
              if (vehicleDatas && vehicleDatas.getVehicle) {
                const vehicle = vehicleDatas.getVehicle.filter(
                  (vehicle: DataType) => {
                    return vehicle.license === e.value
                  }
                )[0]
                if (vehicle) {
                  if (vehicle.trailerNumber1) {
                    setTrailerNumber1(vehicle.trailerNumber1)
                  }
                  if (vehicle.trailerNumber2) {
                    setTrailerNumber2(vehicle.trailerNumber2)
                  }
                }
              }
            }}
          />
          <LoginInput
            clearButton={!!curId}
            label='Чиргүүлийн дугаар №1'
            value={trailerNumber1}
            setValue={setTrailerNumber1}
          />
          <LoginInput
            clearButton={!!curId}
            label='Чиргүүлийн дугаар №2'
            value={trailerNumber2}
            setValue={setTrailerNumber2}
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
