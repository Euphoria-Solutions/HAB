import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { ScrollView } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { useAuth } from '../../auth/auth-provider'
import { UserIcon } from '../../assets/icons'
import { NotificationRequest } from '../../components/content'
import { NotificationType } from '../../utils'
import { ParamListBase } from '@react-navigation/native'

type NotificationProps = {
  navigation: StackNavigationProp<ParamListBase>
}

export const NotificationScreen: React.FC<NotificationProps> = ({
  navigation,
}) => {
  const { theme } = useTheme()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [request, setRequest] = useState<NotificationType>()

  const getIcon = (type: 'userChange' | 'problem') => {
    return (
      <View
        style={[
          styles.iconContainerStyle,
          { backgroundColor: type == 'userChange' ? theme.primary : theme.red },
        ]}
      >
        {type == 'userChange' && <UserIcon style={styles.iconStyle} />}
        {type == 'problem' && (
          <Text style={[styles.iconStyle, styles.iconTextStyle]}>!</Text>
        )}
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.bg,
      height: '100%',
      padding: 20,
      paddingBottom: 0,
    },
    contentStyle: {
      gap: 8,
    },
    iconContainerStyle: {
      alignItems: 'center',
      borderRadius: 15,
      height: 30,
      justifyContent: 'center',
      overflow: 'visible',
      width: 30,
    },
    iconStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 16,
      height: 16,
    },
    iconTextStyle: {
      marginBottom: 8,
    },
    notif: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderRadius: 16,
      flexDirection: 'row',
      gap: 18,
      padding: 20,
    },
    textStyle: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 11,
    },
    titleStyle: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 13,
    },
  })

  return (
    <>
      <NotificationRequest
        request={request}
        modalVisible={open}
        setModalVisible={setOpen}
      />
      <ScrollView
        contentContainerStyle={styles.contentStyle}
        style={styles.container}
      >
        {(!user?.notifications || user.notifications.length == 0) && (
          <Text style={styles.titleStyle}>Мэдэгдэл байхгүй байна.</Text>
        )}
        {user?.notifications?.map((e, i) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (e.request == 'problem') {
                  navigation.navigate('TransportManager', {
                    screen: 'Work',
                    params: {
                      screen: 'Info',
                      params: { id: e.change?.id },
                    },
                  })
                } else {
                  setRequest(e)
                  setOpen(true)
                }
              }}
              style={styles.notif}
              key={i}
            >
              {getIcon(e.request)}
              <View>
                <Text style={styles.titleStyle}>{e.title}</Text>
                <Text style={styles.textStyle}>{e.userRequested}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </>
  )
}
