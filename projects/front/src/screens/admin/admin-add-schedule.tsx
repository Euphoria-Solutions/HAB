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
import { carTempData, scheduleData, workerData } from '../../utils'

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
  const [license, setLicense] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState<Date>()
  const [pickupPoint, setPickupPoint] = useState('')
  const [deliveryLocation, setDeliveryLocation] = useState('')
  const [exitDate, setExitDate] = useState<Date>()
  const [companyName, setCompanyName] = useState('')
  const [driver, setDriver] = useState({
    name: '',
  })
  const [carNumber, setCarNumber] = useState('')
  const [trailerNumber1, setTrailerNumber1] = useState('')
  const [trailerNumber2, setTrailerNumber2] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setId('')
    })
    return unsubscribe
  }, [navigation])
  useEffect(() => {
    if (id) {
      setCurId(id)
      const temp = scheduleData.find(e => e.id == id)
      setLicense(temp?.license ?? '')
      setLocation(temp?.location ?? '')
      setDate(temp?.date ?? undefined)
      setPickupPoint(temp?.pickupPoint ?? '')
      setDeliveryLocation(temp?.deliveryLocation ?? '')
      setExitDate(temp?.exitDate ?? undefined)
      setDriver(temp?.driver ?? { name: '' })
      setCarNumber(temp?.carNumber ?? '')
      setTrailerNumber1(temp?.trailerNumber1 ?? '')
      setTrailerNumber2(temp?.trailerNumber2 ?? '')
      setCompanyName(temp?.companyName ?? '')

      navigation.setOptions({
        title: 'Засах',
      })
    }
  }, [id])

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  const getDriverOptions = () => {
    const drivers: [{ value: string; label: string; icon?: React.ReactNode }] =
      [{ value: '', label: '' }]
    drivers.pop()
    workerData.map(e => {
      drivers.push({
        value: e.name + ' ' + e.surname,
        label: e.name + ' ' + e.surname,
        icon: <View style={styles.profile} />,
      })
    })

    return drivers
  }
  const getCarNumberOptions = () => {
    const carNumbers: [{ value: string; label: string }] = [
      { value: '', label: '' },
    ]
    carNumbers.pop()
    carTempData.map(e => {
      carNumbers.push({
        value: e.carNumber,
        label: e.carNumber,
      })
    })

    return carNumbers
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

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={100}>
      <ScrollView style={styles.container}>
        <View style={styles.contentStyle}>
          <View style={styles.titleContainer}>
            <PackageIcon style={styles.iconStyle} />
            <Text style={styles.title}>Хүргэлтийн мэдээлэл</Text>
          </View>
          <LoginInput
            clearButton={curId ? true : false}
            label='Гэрээний дугаар'
            value={license}
            setValue={setLocation}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Чингэлэг авах газар'
            value={pickupPoint}
            setValue={setPickupPoint}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Амны байршил'
            value={location}
            setValue={setLocation}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Хүргэж өгөх боомтны байршил'
            value={deliveryLocation}
            setValue={setDeliveryLocation}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Байгууллагийн нэр'
            value={companyName}
            setValue={setCompanyName}
          />
          <DatePick label='Он сар' value={date} setValue={setDate} />
          <DatePick label='Гарах цаг' value={exitDate} setValue={setExitDate} />
          <View style={styles.titleContainer}>
            <TruckOutlinedIcon style={styles.iconStyle} />
            <Text style={styles.title}>Тээврийн хэрэгсэл болон жолооч</Text>
          </View>

          <CustomDropdown
            zIndex={1}
            position='above'
            value={driver.name}
            label='Жолооч'
            options={getDriverOptions()}
            onSelect={e => setDriver({ name: e.value })}
          />
          <CustomDropdown
            zIndex={2}
            position='above'
            value={carNumber}
            label='Машины дугаар'
            options={getCarNumberOptions()}
            onSelect={e => setCarNumber(e.value)}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Чиргүүлийн дугаар №1'
            value={trailerNumber1}
            setValue={setTrailerNumber1}
          />
          <LoginInput
            clearButton={curId ? true : false}
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
