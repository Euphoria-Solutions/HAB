import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootAdminStackParamList } from '../../navigation/types'
import { ListContainer } from '../../components/common'
import { useTheme } from '../../theme/theme-provider'
import {
  CalendarIcon,
  SettingsIcon,
  TruckIcon,
  TruckWarningIcon,
  UserPluralIcon,
} from '../../assets/icons'

interface IAdminHome {
  navigation: StackNavigationProp<RootAdminStackParamList, 'Home'>
}

export const AdminHome: React.FC<IAdminHome> = ({ navigation }) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      gap: 12,
      height: '100%',
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    iconStyle: {
      color: theme.darktext,
    },
    listTitleStyle: {
      fontFamily: theme.nunito800,
    },
    titleStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 16,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Хяналт</Text>
      <ListContainer
        itemOptions={{ allTitleStyle: styles.listTitleStyle }}
        items={[
          {
            titleIcon: <UserPluralIcon style={styles.iconStyle} />,
            title: 'Ажилчидын мэдээлэл',
            content: 'default',
            onPress: () => navigation.navigate('Workers'),
          },
          {
            titleIcon: <TruckIcon style={styles.iconStyle} />,
            title: 'Машины мэдээлэл',
            content: 'default',
            onPress: () => navigation.navigate('Cars'),
          },
          {
            titleIcon: <CalendarIcon style={styles.iconStyle} />,
            title: 'Хүргэлтийн хуваарь',
            content: 'default',
            onPress: () => navigation.navigate('Schedule'),
          },
        ]}
      />
      <Text style={styles.titleStyle}>Бусад</Text>
      <ListContainer
        itemOptions={{ allTitleStyle: styles.listTitleStyle, maxWidth: '70%' }}
        items={[
          {
            titleIcon: <SettingsIcon style={styles.iconStyle} />,
            title: 'Солих шаардлагатай эд анги',
            content: 'default',
          },
          {
            titleIcon: <TruckWarningIcon style={styles.iconStyle} />,
            title: 'Асуудал гарсан хүргэлтүүд',
            content: 'default',
            onPress: () => navigation.navigate('Problems'),
          },
        ]}
      />
    </View>
  )
}
