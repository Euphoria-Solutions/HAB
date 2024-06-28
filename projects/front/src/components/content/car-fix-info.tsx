import React, { Dispatch, SetStateAction } from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomModal } from '../custom'
import { CarInfoType, Problems } from '../../utils/interface'
import { ListContainer, RadioSelection } from '../common'
import { useTheme } from '../../theme/theme-provider'
import { useNavigation } from '@react-navigation/native'
import { RootWorkStackParamList } from '../../navigation/types'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  DocumentIcon,
  ElectricityIcon,
  FixIcon,
  SwapIcon,
  SweepIcon,
} from '../../assets/icons'

type CarFixInfoProps = {
  modalVisible: boolean
  setModalVisible: (_v: boolean) => void
  data: CarInfoType | undefined
  quality: { name: string; state: string; value: number }
  setQuality: Dispatch<
    SetStateAction<{ name: string; state: string; value: number }>
  >
  problems: Problems[] | undefined
  setProblems: Dispatch<SetStateAction<Problems[] | undefined>>
}

export const CarFixInfo: React.FC<CarFixInfoProps> = ({
  modalVisible,
  setModalVisible,
  data,
  quality = { value: -1, name: '', state: 'waiting', _id: '' },
  setQuality,
}) => {
  const { theme } = useTheme()
  const navigation =
    useNavigation<BottomTabNavigationProp<RootWorkStackParamList, 'Info'>>()

  console.log('quality', quality)
  // useEffect(() => {
  //   if (data?.quality) {
  //     switch (data?.quality) {
  //       case 'normal':
  //         setQuality({
  //           ...quality,
  //           value: 0,
  //           state: 'finished',
  //         })
  //         break
  //       case 'repair':
  //         setQuality({
  //           ...quality,
  //           value: 1,
  //           state: 'being processed',
  //         })
  //         break
  //       case 'swap':
  //         setQuality({
  //           ...quality,
  //           value: 2,
  //           state: 'being processed',
  //         })
  //         break
  //       case 'charge':
  //         setQuality({
  //           ...quality,
  //           value: 3,
  //           state: 'being processed',
  //         })
  //         break
  //       case 'clean':
  //         setQuality({
  //           ...quality,
  //           value: 4,
  //           state: 'being processed',
  //         })
  //         break
  //       default:
  //         setQuality({
  //           ...quality,
  //           value: -1,
  //           state: 'waiting',
  //         })
  //     }
  //   }
  // }, [data])

  const handleNavigation = () => {
    navigation.navigate('Reason')
    setModalVisible(false)
    console.log('not working')
    setQuality({
      value: -1,
      name: '',
      state: 'waiting',
    })
  }

  const styles = StyleSheet.create({
    container: {
      gap: 20,
      paddingBottom: 20,
    },
    iconStyle: {
      color: theme.iconBg,
      height: 20,
      width: 20,
    },
    listTitleStyle: {
      color: theme.darktext,
      fontFamily: theme.commi600,
      fontSize: 13,
    },
  })

  const arr = [
    {
      title: 'Хэвийн',
      value: 'normal',
      state: 'finished',
      icon: <DocumentIcon style={styles.iconStyle} />,
    },
    {
      title: 'Засварлах',
      value: 'repair',
      state: 'being processed',
      icon: <FixIcon style={styles.iconStyle} />,
    },
    {
      title: 'Солих',
      value: 'swap',
      state: 'being processed',
      icon: <SwapIcon style={styles.iconStyle} />,
    },
    {
      title: 'Цэнэглэх',
      value: 'charge',
      state: 'being processed',
      icon: <ElectricityIcon style={styles.iconStyle} />,
    },
    {
      title: 'Цэвэрлэх ариутгах, угаах',
      value: 'clean',
      state: 'being processed',
      icon: <SweepIcon style={styles.iconStyle} />,
    },
  ]
  return (
    <CustomModal
      title='Чанарын үзүүлэлт'
      visible={modalVisible}
      setVisible={(value: boolean) => {
        setModalVisible(value)
        if (!value) {
          setQuality({
            value: -1,
            name: '',
            state: 'waiting',
          })
        }
      }}
      height='75%'
    >
      <View style={styles.container}>
        <RadioSelection
          selected={quality.value}
          setSelected={value =>
            setQuality({
              ...quality,
              name: data?.name || '',
              state: arr[value]?.state || 'waiting',
              value: value,
            })
          }
          title='Сонголт'
          values={arr}
        />
        {quality.value > 0 && (
          <ListContainer
            items={[
              {
                title: 'Шалтгаан бөглөх',
                content: 'default',
                titleStyle: styles.listTitleStyle,
                onPress: handleNavigation,
              },
            ]}
          />
        )}
      </View>
    </CustomModal>
  )
}
