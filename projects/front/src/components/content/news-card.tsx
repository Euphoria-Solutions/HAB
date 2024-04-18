import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { ImageLoader, MiniDropdown } from '../common'
import { MoreIcon, PenIcon, TrashIcon } from '../../assets/icons'
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootManagerStackParamList } from '../../navigation/types'
import { useNav } from '../../navigation'
import { NewsType } from '../../utils'

type NewsCardProps = {
  data: NewsType
  deleteData: () => void
}

export const NewsCard: React.FC<NewsCardProps> = ({ data, deleteData }) => {
  const { theme } = useTheme()
  const { setId } = useNav()
  const [visible, setVisible] = useState(false)
  const navigation =
    useNavigation<BottomTabNavigationProp<RootManagerStackParamList>>()

  const getTime = () => {
    let difference = new Date().getTime() - data.time.getTime()
    difference /= 60000
    if (difference < 60) {
      return Math.floor(difference) + 'мин'
    }
    difference /= 60
    if (difference < 24) {
      return Math.floor(difference) + 'цаг'
    }
    difference /= 24
    if (difference < 365) {
      return Math.floor(difference) + 'өдөр'
    }
    difference /= 365
    return Math.floor(difference) + 'жил'
  }

  const styles = StyleSheet.create({
    activatorStyle: {
      color: theme.text,
    },
    container: {
      backgroundColor: theme.lightBg,
      borderRadius: 15,
      gap: 8,
      paddingBottom: 20,
      paddingTop: 14,
      width: '100%',
    },
    deleteIcon: {
      color: theme.red,
    },
    editIcon: {
      color: theme.text,
    },
    jobText: {
      color: theme.darktext,
      fontFamily: theme.commi700,
      fontSize: 9,
      gap: 4,
    },
    mainTextStyle: {
      color: theme.text,
      fontFamily: theme.commi500,
      fontSize: 12,
      paddingHorizontal: 14,
      zIndex: -1,
    },
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 18,
      height: 36,
      objectFit: 'cover',
      width: 36,
    },
    seperator: {
      backgroundColor: theme.darktext,
      borderRadius: 1,
      height: 2,
      width: 2,
    },
    titleStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 14,
    },
    userInfo: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
    },
    userNameText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 13,
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.titleStyle}>
        <View style={styles.userInfo}>
          {data.photo ? (
            <Image style={styles.profilePicture} src={data.photo} />
          ) : (
            <View style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.userNameText}>{data.name}</Text>
            <Text style={styles.jobText}>
              {data.job} <View style={styles.seperator} /> {getTime()}
            </Text>
          </View>
        </View>
        <MiniDropdown
          visible={visible}
          setVisible={setVisible}
          options={[
            {
              icon: <TrashIcon style={styles.deleteIcon} />,
              label: 'Устгах',
              function: () => {
                deleteData()
              },
              style: styles.deleteIcon,
            },
            {
              icon: <PenIcon style={styles.editIcon} />,
              label: 'Засах',
              function: () => {
                setId(data.id)
                navigation.navigate('AddPost')
              },
            },
          ]}
          activator={<MoreIcon style={styles.activatorStyle} />}
        />
      </View>
      {data.text && <Text style={styles.mainTextStyle}>{data.text}</Text>}
      {data.imageLinks && <ImageLoader images={data.imageLinks} />}
    </View>
  )
}
