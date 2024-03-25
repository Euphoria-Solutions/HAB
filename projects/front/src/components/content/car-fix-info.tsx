import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomModal } from '../custom'
import { CarInfoType } from '../../utils/interface'
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
}

export const CarFixInfo: React.FC<CarFixInfoProps> = ({
  modalVisible,
  setModalVisible,
  data,
}) => {
  const { theme } = useTheme()
  const navigation =
    useNavigation<BottomTabNavigationProp<RootWorkStackParamList, 'Info'>>()
  const [quality, setQuality] = useState(-1)

  useEffect(() => {
    switch (data?.quality) {
      case 'normal':
        setQuality(0)
        break
      case 'repair':
        setQuality(1)
        break
      case 'swap':
        setQuality(2)
        break
      case 'charge':
        setQuality(3)
        break
      case 'clean':
        setQuality(4)
        break
      default:
        setQuality(-1)
    }
  }, [data])

  const handleNavigation = () => {
    navigation.navigate('Reason')
    setModalVisible(false)
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

  return (
    <CustomModal
      title='Чанарын үзүүлэлт'
      visible={modalVisible}
      setVisible={setModalVisible}
      height='75%'
    >
      <View style={styles.container}>
        <RadioSelection
          selected={quality}
          setSelected={setQuality}
          title='Сонголт'
          values={[
            {
              title: 'Хэвийн',
              value: 'normal',
              icon: <DocumentIcon style={styles.iconStyle} />,
            },
            {
              title: 'Засварлах',
              value: 'repair',
              icon: <FixIcon style={styles.iconStyle} />,
            },
            {
              title: 'Солих',
              value: 'swap',
              icon: <SwapIcon style={styles.iconStyle} />,
            },
            {
              title: 'Цэнэглэх',
              value: 'charge',
              icon: <ElectricityIcon style={styles.iconStyle} />,
            },
            {
              title: 'Цэвэрлэх ариутгах, угаах',
              value: 'clean',
              icon: <SweepIcon style={styles.iconStyle} />,
            },
          ]}
        />
        {quality > 0 && (
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
