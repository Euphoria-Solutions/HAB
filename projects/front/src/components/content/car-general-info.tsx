import React, { useEffect, useState } from 'react'
import { DataType } from '../../utils/interface'
import { ListContainer, SignatureCard, Tab } from '../common'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { useAuth } from '../../auth/auth-provider'
import { carInfoTempData } from '../../utils'

type CarGeneralInfoProps = {
  data: DataType | undefined
}

export const CarGeneralInfo: React.FC<CarGeneralInfoProps> = ({ data }) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [tab, setTab] = useState(0)
  const [isCarFine, setIsCarFine] = useState(true)

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
                    { content: data?.carNumber, title: 'Улсын дугаар' },
                    {
                      content: data?.trailerNumber,
                      title: 'Чиргүүлийн дугаар №1',
                    },
                    {
                      content: data?.trailerNumber2,
                      title: 'Чиргүүлийн дугаар №2',
                    },
                    { content: 'Zembab', title: 'Чиргүүлийн дугаар №3' },
                    { content: 'Zembab', title: 'Чиргүүлийн дугаар №4' },
                  ]}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Үйлдвэрлэсэн</Text>
                <ListContainer
                  itemOptions={{ allDisabled: true }}
                  items={[
                    { content: 'Zembab', title: 'Улсын нэр' },
                    { content: 'Zembab', title: 'Он, сар' },
                    { content: 'Zembab', title: 'Хөдөлгүүр №' },
                    { content: 'Zembab', title: 'Рамны №' },
                  ]}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Бусад</Text>
                <ListContainer
                  itemOptions={{ allDisabled: true }}
                  items={[
                    { content: 'Zembab', title: `Даац/тонн/ \nсуудлын тоо` },
                    { content: 'Zembab', title: 'Монголд ирсэн он, сар, өдөр' },
                    {
                      content: '.',
                      title: 'Улсын бүртгэлийн гэрчилгээний дугаар',
                    },
                    {
                      content: 'Zembab',
                      title: 'Ашиглалтанд орсон он, сар өдөр',
                    },
                    {
                      content: 'Zembab',
                      title: 'Автомашины анхны үнэ /төгрөг/',
                    },
                    {
                      content: 'Zembab',
                      title: 'Эдэлгээний хугацааны норм /км/',
                    },
                    {
                      content: 'Zembab',
                      title: 'Шатахууны үндсэн норм/100км-т/',
                    },
                    { content: 'Zembab', title: 'Хөдөлгүүр хүч чадал' },
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
                    content: isCarFine ? 'Хэвийн' : 'Хэвийн бус',
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
            job='ХАБ'
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
                        { content: 'Zembab', title: 'Гэрээний дугаар' },
                        { content: 'Zembab', title: 'Он, сар' },
                        { content: 'Zembab', title: 'Жолооч' },
                      ]
                    : [
                        { content: 'Zembab', title: 'Гэрээний дугаар' },
                        { content: 'Zembab', title: 'Он, сар' },
                        { content: 'Zembab', title: 'Чингэлэг авах байршил' },
                        { content: 'Zembab', title: 'Амны байршил' },
                        { content: 'Zembab', title: 'Боомтны байршил' },
                      ]
                  : [
                      { content: 'Zembab', title: 'Гэрээний дугаар' },
                      { content: 'Zembab', title: 'Он, сар' },
                    ]
              }
            />
          </View>
          <SignatureCard
            title='Хүргэлтийг оруулсан'
            job='ХАБ'
            name='Доржсүрэн Энхриймаа'
          />
        </View>
      )}
    </>
  )
}
