import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Indicator, ListContainer } from '../common'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CameraIcon, EditIcon, PlusIcon } from '../../assets/icons'
import { useTheme } from '../../theme/theme-provider'
import { carInfoTempData } from '../../utils/temp-datas'
import { CarInfoType, EngineType } from '../../utils/interface'
import { CarFixInfo } from './car-fix-info'

type CarInfoListProps = {
  type: EngineType | 'all'
  showCount?: boolean
  count?: { all: number; finished: number }
  setCount?: Dispatch<SetStateAction<{ all: number; finished: number }>>
}

export const CarInfoList: React.FC<CarInfoListProps> = ({
  type,
  showCount = false,
  setCount,
  count,
}) => {
  const { theme } = useTheme()
  const [typeToShow, setTypeToShow] = useState<EngineType[]>([])
  const [qualityData, setQualityData] = useState<CarInfoType>()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (type == 'all') {
      setTypeToShow(['engine', 'disk', 'transmission', 'other'])
      setCount && setCount({ all: 0, finished: 0 })
      if (setCount && count) {
        carInfoTempData.map(e => {
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
    carInfoTempData.map(e => {
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
    carInfoTempData.forEach(e => {
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
                <TouchableOpacity onPress={() => handleFixInfo(e)}>
                  <Text style={styles.fixButtonText}>Засварлах</Text>
                </TouchableOpacity>
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
      fontFamily: theme.nunito700,
      fontSize: 18,
    },
    titleContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    titleIcon: {
      color: theme.darktext,
      height: 20,
      width: 23,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.showInfo}>
        {type == 'all' && (
          <View style={styles.container}>
            <Text style={[styles.title, styles.titleContainer]}>Хянах:</Text>
            <ListContainer
              itemOptions={{ allDisabled: true, maxWidth: '60%' }}
              items={[
                {
                  title: 'Гэрээний дугаар',
                  content: '123456789',
                },
                {
                  title: 'Он, сар',
                  content: '123456789',
                },
                {
                  title: 'Улсын дугаар',
                  content: '123456789',
                },
                {
                  title: 'Тээврийн хэрэгслийн марк',
                  content: '123456789',
                },
                {
                  title: 'Байгууллагийн нэр',
                  content: '123456789',
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
                  <CameraIcon style={styles.titleIcon} />
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
      <CarFixInfo
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        data={qualityData && qualityData}
      />
    </View>
  )
}
