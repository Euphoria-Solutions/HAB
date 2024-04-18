import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { MiniDropdown } from '../common'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RootManagerStackParamList } from '../../navigation/types'
import { MoreIcon, PenIcon, TrashIcon } from '../../assets/icons'

type NewsCardProps = {
  name: string
  photo?: string
  job: string
  time: Date
  text?: string
  imageLinks?: string[]
  navigation: BottomTabNavigationProp<RootManagerStackParamList, 'Home'>
  deleteData: () => void
}

export const NewsCard: React.FC<NewsCardProps> = ({
  name,
  job,
  time,
  text,
  imageLinks,
  photo,
  navigation,
  deleteData,
}) => {
  const { theme } = useTheme()
  const [visible, setVisible] = useState(false)

  const getTime = () => {
    let difference = new Date().getTime() - time.getTime()
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
    imageBaseStyle: {
      flex: 1,
      flexGrow: 1,
    },
    imageColumnContainer: {
      gap: 4,
      zIndex: -1,
    },
    imageContainer: {
      flexDirection: 'row',
      gap: 4,
      zIndex: -1,
    },
    imageOutsideStyle: {
      height: 312,
    },
    imageOutsideStyleBig: {
      height: 312,
      width: '60%',
    },
    imageOutsideStyleBottom: {
      height: 130,
    },
    imageOutsideStyleTop: {
      height: 172,
    },
    imageStyle: {
      height: '100%',
      width: '100%',
    },
    imageStyleSecond: {
      gap: 4,
      width: '40%',
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
          {photo ? (
            <Image style={styles.profilePicture} src={photo} />
          ) : (
            <View style={styles.profilePicture} />
          )}
          <View>
            <Text style={styles.userNameText}>{name}</Text>
            <Text style={styles.jobText}>
              {job} <View style={styles.seperator} /> {getTime()}
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
                navigation.navigate('AddPost', { editId: '1' })
              },
            },
          ]}
          activator={<MoreIcon style={styles.activatorStyle} />}
        />
      </View>
      {text && <Text style={styles.mainTextStyle}>{text}</Text>}
      {imageLinks &&
        (imageLinks.length <= 2 ? (
          <View style={styles.imageContainer}>
            {imageLinks.map((e, i) => {
              return (
                <Image
                  style={[styles.imageOutsideStyle, styles.imageBaseStyle]}
                  src={e}
                  key={i}
                />
              )
            })}
          </View>
        ) : imageLinks.length <= 4 ? (
          <View style={styles.imageContainer}>
            <Image src={imageLinks[0]} style={styles.imageOutsideStyleBig} />
            <View style={styles.imageStyleSecond}>
              {imageLinks.map((e, i) => {
                if (i != 0) {
                  return (
                    <View key={i} style={styles.imageBaseStyle}>
                      <Image style={styles.imageStyle} src={e} key={i} />
                    </View>
                  )
                }
              })}
            </View>
          </View>
        ) : (
          <View style={styles.imageColumnContainer}>
            <View style={styles.imageContainer}>
              <Image
                src={imageLinks[0]}
                style={[styles.imageOutsideStyleTop, styles.imageBaseStyle]}
              />
              <Image
                src={imageLinks[1]}
                style={[styles.imageOutsideStyleTop, styles.imageBaseStyle]}
              />
            </View>
            <View style={styles.imageContainer}>
              {imageLinks.map((e, i) => {
                return (
                  i >= 2 && (
                    <View
                      key={i}
                      style={[
                        styles.imageOutsideStyleBottom,
                        styles.imageBaseStyle,
                      ]}
                    >
                      <Image style={styles.imageStyle} src={e} key={i} />
                    </View>
                  )
                )
              })}
            </View>
          </View>
        ))}
    </View>
  )
}
