import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { useTheme } from '../../theme/theme-provider'
import { DatePick, LoginInput, SubmitButton } from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { CarInfoIcon, CarRepairIcon, InfoIcon } from '../../assets/icons'
import { useNav } from '../../navigation'
import { ADD_VEHICLE, EDIT_VEHICLE, GET_VEHICLES } from '../../graphql'
import { useLazyQuery, useMutation } from '@apollo/client'

interface IAdminAddCar {
  navigation: StackNavigationProp<RootAdminStackParamList, 'AddCar'>
}

interface IVehicle {
  _id: string
  license: string
  trailerNumber1: string
  trailerNumber2: string
  manufacturedCountry: string
  date: string
  engineNumber: string
  ramNumber: string
  tonnage: string
  dateOfArrival: string
  certificate: string
  dateOfUse: string
  price: string
  durability: string
  fuel: string
  enginePower: string
}

export const AdminAddCar: React.FC<IAdminAddCar> = ({ navigation }) => {
  const { theme } = useTheme()
  const { id, setId } = useNav()
  const [curId, setCurId] = useState('')
  const [loading, setLoading] = useState(false)
  const [license, setLicense] = useState('')
  const [trailerNumber1, setTrailerNumber1] = useState('')
  const [trailerNumber2, setTrailerNumber2] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState<Date | undefined>()
  const [engineNumber, setEngineNumber] = useState('')
  const [ramNumber, setRamNumber] = useState('')
  const [tonnage, setTonnage] = useState('')
  const [dateOfArrival, setDateOfArrival] = useState<Date | undefined>()
  const [certificate, setCertificate] = useState('')
  const [dateOfUse, setDateOfUse] = useState<Date | undefined>()
  const [price, setPrice] = useState('')
  const [durability, setDurability] = useState('')
  const [fuel, setFuel] = useState('')
  const [enginePower, setEnginePower] = useState('')
  const [addCar] = useMutation(ADD_VEHICLE)
  const [editCar] = useMutation(EDIT_VEHICLE)
  const [getCars] = useLazyQuery(GET_VEHICLES)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setId('')
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    const fetchCarData = async () => {
      if (id) {
        setCurId(id)
        try {
          const { data } = await getCars({
            variables: { _id: id },
          })
          const temp = data?.getVehicle.filter(
            (vehicle: IVehicle) => vehicle._id == id
          )[0]
          setLicense(temp?.license ?? '')
          setTrailerNumber1(temp?.trailerNumber1 ?? '')
          setTrailerNumber2(temp?.trailerNumber2 ?? '')
          setCountry(temp?.manufacturedCountry ?? '')
          setDate(temp?.date ? new Date(temp.date) : undefined)
          setEngineNumber(temp?.engineNumber ?? '')
          setRamNumber(temp?.ramNumber ?? '')
          setTonnage(temp?.tonnage ?? '')
          setDateOfArrival(
            temp?.dateOfArrival ? new Date(temp.dateOfArrival) : undefined
          )
          setCertificate(temp?.certificate ?? '')
          setDateOfUse(temp?.dateOfUse ? new Date(temp.dateOfUse) : undefined)
          setPrice(temp?.price ?? '')
          setDurability(temp?.durability ?? '')
          setFuel(temp?.fuel ?? '')
          setEnginePower(temp?.enginePower ?? '')
          navigation.setOptions({ title: 'Edit Vehicle' })
        } catch (error) {
          console.log('Error fetching vehicle data:', error)
        }
      }
    }
    fetchCarData()
  }, [id])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const variables = {
        license,
        trailerNumber1,
        trailerNumber2,
        manufacturedCountry: country,
        date: date?.toISOString() || '',
        engineNumber,
        ramNumber,
        tonnage,
        dateOfArrival: dateOfArrival?.toISOString() || '',
        certificate,
        dateOfUse: dateOfUse?.toISOString() || '',
        price,
        durability,
        fuel,
        enginePower,
      }

      if (curId) {
        await editCar({ variables: { ...variables, id: curId } })
      } else {
        await addCar({ variables })
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
    },
    contentContainer: {
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
    <KeyboardAvoidingView
      behavior='padding'
      enabled
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.contentContainer}>
        <View style={styles.contentStyle}>
          <View style={styles.titleContainer}>
            <CarInfoIcon style={styles.iconStyle} />
            <Text style={styles.title}>Улсын дугаарууд</Text>
          </View>
          <LoginInput
            clearButton={curId ? true : false}
            label='Улсын дугаар'
            value={license}
            setValue={setLicense}
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
          <View style={styles.titleContainer}>
            <CarRepairIcon style={styles.iconStyle} />
            <Text style={styles.title}>Үйлдвэрлэсэн</Text>
          </View>
          <LoginInput
            clearButton={curId ? true : false}
            label='Улсын нэр'
            value={country}
            setValue={setCountry}
          />
          <DatePick value={date} setValue={setDate} label='Он сар' />
          <LoginInput
            clearButton={curId ? true : false}
            label='Хөдөлгүүр №'
            value={engineNumber}
            setValue={setEngineNumber}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Рамны №'
            value={ramNumber}
            setValue={setRamNumber}
          />
          <View style={styles.titleContainer}>
            <InfoIcon style={styles.iconStyle} />
            <Text style={styles.title}>Бусад</Text>
          </View>
          <LoginInput
            keyboardType='number-pad'
            clearButton={curId ? true : false}
            label='Даац/тонн/ суудлын тоо'
            value={tonnage}
            setValue={setTonnage}
          />
          <DatePick
            value={dateOfArrival}
            setValue={setDateOfArrival}
            label='Монголд ирсэн он, сар, өдөр'
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Улсын бүртгэлийн гэрчилгээний дугаар'
            value={certificate}
            setValue={setCertificate}
          />
          <DatePick
            value={dateOfUse}
            setValue={setDateOfUse}
            label='Ашиглалтанд орсон он, сар, өдөр'
          />
          <LoginInput
            keyboardType='number-pad'
            clearButton={curId ? true : false}
            label='Автомашины анхны үнэ/төгрөг/'
            value={price}
            setValue={setPrice}
          />
          <LoginInput
            keyboardType='number-pad'
            clearButton={curId ? true : false}
            label='Эдэлгээний хугацааны норм/км/'
            value={durability}
            setValue={setDurability}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Шатахууны үндсэн норм/100км-т/'
            value={fuel}
            setValue={setFuel}
          />
          <LoginInput
            clearButton={curId ? true : false}
            label='Хөдөлгүүр хүч чадал'
            value={enginePower}
            setValue={setEnginePower}
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
