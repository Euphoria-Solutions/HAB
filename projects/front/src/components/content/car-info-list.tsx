import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Indicator, ListContainer, SignatureCard } from '../common'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { EditIcon, PlusIcon } from '../../assets/icons'
import { useTheme } from '../../theme/theme-provider'
import {
  CarInfoType,
  DataType,
  EngineType,
  Problems,
} from '../../utils/interface'
import { CarFixInfo } from './car-fix-info'
import { useAuth } from '../../auth/auth-provider'
import { useWork } from '../../services/work-provder'

type CarInfoListProps = {
  type: EngineType | 'all'
  showCount?: boolean
  count?: { all: number; finished: number }
  setCount?: Dispatch<SetStateAction<{ all: number; finished: number }>>
}

const qualityTypes = ['normal', 'repair', 'swap', 'charge', 'clean']

export const CarInfoList: React.FC<CarInfoListProps> = ({
  type,
  showCount = false,
  setCount,
  count,
}) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [typeToShow, setTypeToShow] = useState<EngineType[]>([])
  const [qualityData, setQualityData] = useState<CarInfoType>()
  const [modalVisible, setModalVisible] = useState(false)
  const { workData, workId, setMechanic, mechanic } = useWork()
  const [data, setData] = useState<DataType>()
  const [checkList, setCheckList] = useState<CarInfoType[]>()
  const [quality, setQuality] = useState({
    value: -1,
    name: '',
    state: 'waiting',
  })
  const [problems, setProblems] = useState<Problems[]>()

  useEffect(() => {
    const fetchData = async () => {
      if (workData) {
        setData(workData.find(work => work._id === workId))
      }
    }
    fetchData()
  }, [workData, workId])

  useEffect(() => {
    if (mechanic?.data) {
      setCheckList(mechanic.data)
    }
  }, [mechanic])

  useEffect(() => {
    if (type == 'all') {
      setTypeToShow(['engine', 'disk', 'transmission', 'other'])
      setCount && setCount({ all: 0, finished: 0 })
      if (setCount && count) {
        checkList?.map(e => {
          setCount(prev => {
            return { all: prev?.all + 1, finished: prev?.finished }
          })
          e.state == 'finished' &&
            setCount(prev => {
              return { all: prev?.all, finished: prev?.finished + 1 }
            })
        })
      }
    } else {
      setTypeToShow([type])
    }
  }, [type])

  useEffect(() => {
    if (quality.name !== '') {
      setMechanic({
        ...mechanic,
        _id: mechanic?._id,
        data: checkList?.map(work => {
          if (work.name == quality.name) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const workQuality:
              | 'charge'
              | 'swap'
              | 'clean'
              | 'normal'
              | 'repair' = qualityTypes[quality.value]
            return {
              ...work,
              state: quality.state,
              quality: workQuality,
            }
          }
          return work
        }),
        problem: mechanic?.problem,
        vehicle: mechanic?.vehicle,
        mechanicEngineer: mechanic?.mechanicEngineer,
      })
    }
    setCheckList(mechanic?.data)
  }, [quality, setMechanic])

  const handleFixInfo = (data: CarInfoType) => {
    setQualityData(data)
    setModalVisible(true)
  }
  const translateType = (t: EngineType): string => {
    switch (t) {
      case 'disk':
        return 'Дискэн холбоо'
      case 'engine':
        return 'Хөдөлгүүр'
      case 'other':
        return 'Хөдөлгүүр'
      case 'transmission':
        return 'Хурдны хайрцаг'
    }
  }
  const findTypes = (engineInfo: EngineType, showAll: boolean): number => {
    let number = 0
    checkList?.map(e => {
      if (engineInfo == e.type) {
        if (showAll || e.state == 'finished') {
          number++
        }
      }
    })
    return number
  }
  const addButton = (add: boolean, data: CarInfoType) => {
    return (
      <TouchableOpacity onPress={() => handleFixInfo(data)}>
        {add ? (
          <PlusIcon style={styles.listIcon} />
        ) : (
          <EditIcon style={styles.listIcon} />
        )}
      </TouchableOpacity>
    )
  }
  const showItems = (t: EngineType) => {
    const cur: { content: ReactNode; title: string | ReactNode }[] = []
    checkList?.forEach(e => {
      if (t == e.type) {
        cur.push({
          content:
            type == 'all' ? (
              <Indicator state={e.state} />
            ) : e.state != 'finished' ? (
              addButton(true, e)
            ) : (
              addButton(false, e)
            ),
          title:
            e.state != 'finished' ? (
              e.name
            ) : (
              <View style={styles.listTitleContainer}>
                <View style={styles.listTitleContent}>
                  <Text style={styles.listTitleStyle}>{e.name}</Text>
                  {type != 'all' && <Indicator state={e.state} />}
                </View>
                {user?.job == 'mechanic' && (
                  <TouchableOpacity onPress={() => handleFixInfo(e)}>
                    <Text style={styles.fixButtonText}>Засварлах</Text>
                  </TouchableOpacity>
                )}
              </View>
            ),
        })
      }
    })
    return cur
  }

  const styles = StyleSheet.create({
    container: {
      gap: 10,
    },
    countText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    fixButtonText: {
      color: theme.text,
      fontSize: 13,
      fontWeight: '600',
    },
    header: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
      textAlign: 'center',
    },
    listIcon: {
      color: theme.darktext,
      width: 14,
    },
    listTitleContainer: {
      gap: 8,
      width: '100%',
    },
    listTitleContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listTitleStyle: {
      color: theme.darktext,
      flex: 1,
      fontSize: 12,
      fontWeight: '700',
    },
    showInfo: {
      gap: 20,
    },
    title: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 18,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    // titleIcon: {
    //   color: theme.darktext,
    //   height: 20,
    //   width: 23,
    // },
  })

  return (
    <View style={styles.container}>
      {user?.job == 'manager' && (
        <Text style={styles.header}>Авто машины үзлэгийн тайлан</Text>
      )}
      <View style={styles.showInfo}>
        {type == 'all' && (
          <View style={styles.container}>
            <Text style={[styles.title, styles.titleContainer]}>Хянах:</Text>
            <ListContainer
              itemOptions={{ allDisabled: true, maxWidth: '60%' }}
              items={[
                {
                  title: 'Гэрээний дугаар',
                  content: data?.contractNumber,
                },
                {
                  title: 'Он, сар',
                  content: data?.date.toString(),
                },
                {
                  title: 'Улсын дугаар',
                  content: data?.license,
                },
                {
                  title: 'Тээврийн хэрэгслийн марк',
                  content: 'DAF',
                },
                {
                  title: 'Байгууллагийн нэр',
                  content: 'IRU',
                },
              ]}
            />
          </View>
        )}
        {typeToShow.map((e, i) => (
          <View style={styles.container} key={i}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ангилал: {translateType(e)}</Text>
              {showCount ? (
                <Text style={styles.countText}>
                  {findTypes(e, false)}/{findTypes(e, true)}
                </Text>
              ) : (
                <TouchableOpacity>
                  {/* <CameraIcon style={styles.titleIcon} /> */}
                </TouchableOpacity>
              )}
            </View>
            <ListContainer
              itemOptions={{ allDisabled: true, maxWidth: '75%' }}
              items={showItems(e)}
            />
          </View>
        ))}
      </View>
      <ListContainer
        items={[{ title: 'Хавсарсан зурагнууд: 0', content: 'default' }]}
      />
      {user?.job == 'manager' && (
        <SignatureCard
          job='механик инженер'
          name='Доржсүрэн Энхриймаа'
          title='Тээврийн хэрэгсэл шалгасан'
        />
      )}
      <CarFixInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        quality={quality}
        setQuality={setQuality}
        data={qualityData && qualityData}
        problems={problems}
        setProblems={setProblems}
      />
    </View>
  )
}
