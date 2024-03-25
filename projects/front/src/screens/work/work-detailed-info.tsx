import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../theme/theme-provider'
import { CameraIcon } from '../../assets/icons'
import { ListContainer, LoginInput } from '../../components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { carProblemData } from '../../utils/temp-datas'

export const WorkDetailedInfo: React.FC = () => {
  const { theme } = useTheme()
  const route = useRoute()
  const { id } = route.params as { id: number }
  const [utility, setUtility] = useState('')
  const [reason, setReason] = useState('')
  const [parts, setParts] = useState([{ label: '', value: '' }])

  useEffect(() => {
    if (typeof id == 'number') {
      setUtility(carProblemData[id].title)
      setReason(carProblemData[id].reason)
      setParts(carProblemData[id].parts)
    }
  }, [id])

  const showItems = (): { title: string; content: string }[] => {
    const temp: { title: string; content: string }[] = []

    parts.map((e, i) => {
      temp.push({
        title: i + 1 + '. ' + e.label,
        content: 'none',
      })
    })

    return temp
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      justifyContent: 'space-between',
    },
    contentContainer: {
      gap: 12,
      padding: 20,
    },
    iconStyle: {
      color: theme.iconBg,
    },
    inputStyle: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 14,
      paddingTop: 16,
    },
    listStyle: {
      zIndex: -1,
    },
    listTitleStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    titleGrayStyle: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    titleStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
  })

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleGrayStyle}>
            Асуудал: <Text style={styles.titleStyle}>Засварлах</Text>
          </Text>
          <TouchableOpacity>
            <CameraIcon style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
        <LoginInput
          editable={false}
          placeholder='Доголдолтой эд анги'
          value={utility}
          style={styles.inputStyle}
          setValue={setUtility}
        />
        <LoginInput
          editable={false}
          placeholder='Тайлан'
          value={reason}
          setValue={setReason}
          style={styles.inputStyle}
          multiline
        />
        <Text style={styles.titleStyle}>Шаардлагатай эд анги</Text>
        <ListContainer
          style={styles.listStyle}
          itemOptions={{
            allDisabled: true,
            allTitleStyle: styles.listTitleStyle,
            maxWidth: '100%',
          }}
          items={showItems()}
        />
        <ListContainer
          style={styles.listStyle}
          items={[
            {
              title: 'Хавсарсан зурагнууд: 8',
              content: 'default',
            },
          ]}
        />
      </ScrollView>
    </View>
  )
}
