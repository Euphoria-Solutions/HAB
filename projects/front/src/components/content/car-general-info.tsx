import React, { useEffect, useState } from 'react'
import { DataType, VehicleType } from '../../utils/interface'
import { ListContainer, SignatureCard, Tab } from '../common'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { useAuth } from '../../auth/auth-provider'
import { carInfoTempData } from '../../utils'
import { GET_DELIVERIES, GET_VEHICLES } from '../../graphql'
import { useLazyQuery } from '@apollo/client'
import { useWork } from '../../services/work-provder'

type CarGeneralInfoProps = {
  data: DataType | undefined
}

export type ScheduleType = {
  contractNumber: string
  date: string
  _id: string
  pickupPoint: string
  location: string
  deliveryLocation: string
  companyName: string
  exitDate: string
  driver: string
  license: string
  trailerNumber1: string
  trailerNumber2: string
  state: 'failed' | 'success'
}

export const CarGeneralInfo: React.FC<CarGeneralInfoProps> = ({ data }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [tab, setTab] = useState(0)
  const [isCarFine, setIsCarFine] = useState(true)
  const [delivery, setDelivery] = useState<ScheduleType>()
  const [vehicle, setVehicle] = useState<VehicleType>()
  const [getVehicle] = useLazyQuery(GET_VEHICLES)
  const [getDeliveries] = useLazyQuery(GET_DELIVERIES)
  const [statusData, setStatusData] = useState<DataType>()
  const { workData, workId } = useWork()

  useEffect(() => {
    const fetchData = async () => {
      if (workData) {
        const foundData = workData.find(work => work._id === workId)
        setStatusData(foundData)
      }
    }
    fetchData()
  }, [workData, workId])

  useEffect(() => {
    const getVehicleData = async () => {
      const { data: vehicelData } = await getVehicle({
        variables: { license: data?.license },
      })
      setVehicle(vehicelData.getVehicle[0])
    }
    getVehicleData()
  }, [vehicle])

  useEffect(() => {
    const getDeliveryData = async () => {
      const { data: deliveryData } = await getDeliveries({
        variables: { license: data?.license },
      })
      setDelivery(deliveryData.getDeliveries[0])
    }
    getDeliveryData()
  }, [delivery])

  useEffect(() => {
    if (carInfoTempData) {
      carInfoTempData.map(e => {
        if (e.state != 'finished') {
          setIsCarFine(false)
        }
      })
    }
  }, [carInfoTempData])

  const styles = StyleSheet.create({
    divider: {
      backgroundColor: theme.border,
      height: 1,
      width: '100%',
    },
    driverInfo: {
      gap: 6,
    },
    driverInfoContainer: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 8,
      paddingHorizontal: 18,
      paddingVertical: 22,
    },
    driverInfoName: {
      color: theme.text,
      flexWrap: 'wrap',
      fontFamily: theme.nunito800,
      fontSize: 12,
    },
    driverInfoText: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 11,
    },
    listContainer: {
      gap: 6,
    },
    listTitle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 30,
      height: 60,
      width: 60,
    },
    sectionTitle: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 16,
    },
    tabContainer: {
      gap: 20,
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
      textAlign: 'center',
    },
  })

  return (
    <>
      <Text style={styles.title}>Хүргэлтийн мэдээлэл</Text>
      <Tab allTabs={['Машин', 'Хүргэлт']} tab={tab} setTab={setTab} />
      {tab == 0 ? (
        <View style={styles.tabContainer}>
          {user?.job != 'engineer' ? (
            <>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Улсын дугаарууд</Text>
                <ListContainer
                  itemOptions={{ allDisabled: true }}
                  items={[
                    { content: data?.license, title: 'Улсын дугаар' },
                    {
                      content: data?.trailerNumber
                        ? data?.trailerNumber
                        : 'чиргүүл байхгүй',
                      title: 'Чиргүүлийн дугаар №1',
                    },
                    {
                      content: data?.trailerNumber2
                        ? data?.trailerNumber2
                        : '2 дахь чиргүүл байхгүй',
                      title: 'Чиргүүлийн дугаар №2',
                    },
                  ]}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Үйлдвэрлэсэн</Text>
                <ListContainer
                  itemOptions={{ allDisabled: true }}
                  items={[
                    {
                      content: vehicle?.manufacturedCountry,
                      title: 'Улсын нэр',
                    },
                    { content: vehicle?.date, title: 'Он, сар' },
                    { content: vehicle?.engineNumber, title: 'Хөдөлгүүр №' },
                    { content: vehicle?.ramNumber, title: 'Рамны №' },
                  ]}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Бусад</Text>
                <ListContainer
                  itemOptions={{ allDisabled: true }}
                  items={[
                    {
                      content: vehicle?.tonnage,
                      title: `Даац/тонн/ \nсуудлын тоо`,
                    },
                    {
                      content: '',
                      title: 'Монголд ирсэн он, сар, өдөр',
                    },
                    {
                      content: vehicle?.certificate,
                      title: 'Улсын бүртгэлийн гэрчилгээний дугаар',
                    },
                    {
                      content: vehicle?.dateOfUse,
                      title: 'Ашиглалтанд орсон он, сар өдөр',
                    },
                    {
                      content: vehicle?.price,
                      title: 'Автомашины анхны үнэ /төгрөг/',
                    },
                    {
                      content: vehicle?.durability,
                      title: 'Эдэлгээний хугацааны норм /км/',
                    },
                    {
                      content: vehicle?.fuel,
                      title: 'Шатахууны үндсэн норм/100км-т/',
                    },
                    {
                      content: vehicle?.enginePower,
                      title: 'Хөдөлгүүр хүч чадал',
                    },
                  ]}
                />
              </View>
            </>
          ) : (
            <View style={styles.listContainer}>
              <Text style={styles.listTitle}>Механик инженерийн тайлан</Text>
              <ListContainer
                itemOptions={{ allDisabled: true }}
                items={[
                  {
                    content: isCarFine
                      ? 'Хэвийн'
                      : statusData?.mechanicCheckList != ''
                        ? 'Хэвийн бус'
                        : 'Хүлээгдэж байгаа',
                    title: 'Машины байдал',
                  },
                  {
                    content: data?.signature ? 'Бүрэн' : 'Дутуу',
                    title: 'Гарийн үсэг',
                  },
                ]}
              />
            </View>
          )}
          <SignatureCard
            title='Хувийн хэрэг нээж бүртгэсэн:'
            job='Тээвэр зохицуулагч'
            name='Доржсүрэн Энхриймаа'
          />
          {user?.job != 'engineer' && (
            <>
              <Text style={styles.sectionTitle}>Жолоочийн мэдээлэл</Text>
              <View style={styles.divider} />
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Хүлээж авах жолооч</Text>
                <View style={styles.driverInfoContainer}>
                  <View style={styles.profilePicture} />
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverInfoText}>
                      Овог нэр: {'  '}
                      <Text style={styles.driverInfoName}>{data?.driver}</Text>
                    </Text>
                    <Text style={styles.driverInfoText}>
                      Холбогдох дугаар: {'  '}
                      <Text style={styles.driverInfoName}>+965 88889999</Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Өмнөх жолооч</Text>
                <View style={styles.driverInfoContainer}>
                  <View style={styles.profilePicture} />
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverInfoText}>
                      Овог нэр: {'  '}
                      <Text style={styles.driverInfoName}>
                        Мэдээлэл олдсонгүй
                      </Text>
                    </Text>
                    <Text style={styles.driverInfoText}>
                      Холбогдох дугаар: {'  '}
                      <Text style={styles.driverInfoName}>
                        Мэдээлэл олдсонгүй
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      ) : (
        <View style={styles.tabContainer}>
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Хүргэлтийн мэдээлэл</Text>
            <ListContainer
              itemOptions={{ allDisabled: true }}
              items={
                user?.job != 'mechanic'
                  ? user?.job == 'engineer'
                    ? [
                        {
                          content: delivery?.contractNumber,
                          title: 'Гэрээний дугаар',
                        },
                        {
                          content: delivery?.date,
                          title: 'Он, сар',
                        },
                        { content: delivery?.driver, title: 'Жолооч' },
                      ]
                    : [
                        {
                          content: delivery?.contractNumber,
                          title: 'Гэрээний дугаар',
                        },
                        { content: delivery?.date, title: 'Он, сар' },
                        {
                          content: delivery?.pickupPoint,
                          title: 'Чингэлэг авах байршил',
                        },
                        { content: delivery?.location, title: 'Амны байршил' },
                        {
                          content: delivery?.deliveryLocation,
                          title: 'Боомтны байршил',
                        },
                      ]
                  : [
                      {
                        content: delivery?.contractNumber,
                        title: 'Гэрээний дугаар',
                      },
                      { content: delivery?.date, title: 'Он, сар' },
                    ]
              }
            />
          </View>
          <SignatureCard
            title='Хүргэлтийг оруулсан'
            job='Тээвэр зохицуулагч'
            name='Доржсүрэн Энхриймаа'
          />
        </View>
      )}
    </>
  )
}
