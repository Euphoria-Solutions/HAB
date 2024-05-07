import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { CustomModal } from '../custom'
import { NotificationType, UserType, users } from '../../utils'
import { SubmitButton } from '../common'
import { RightLineIcon } from '../../assets/icons'

type NotificationRequestProps = {
  modalVisible: boolean
  setModalVisible: (_v: boolean) => void
  request: NotificationType | undefined
}

export const NotificationRequest: React.FC<NotificationRequestProps> = ({
  modalVisible,
  setModalVisible,
  request,
}) => {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    if (users && request?.change) {
      users.map(e => {
        if (e.id == request?.change?.id) {
          setUser(e)
        }
      })
    }
  }, [users, request])

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  const handleReject = () => {
    setLoadingError(true)
    setTimeout(() => {
      setLoadingError(false)
    }, 3000)
  }
  const getJobName = (job?: 'driver' | 'engineer' | 'manager' | 'mechanic') => {
    if (job) {
      switch (job) {
        case 'driver':
          return 'Жолооч'
        case 'engineer':
          return 'ХАБЭА ажилтан'
        case 'manager':
          return 'Тээвэр зохицуулагч'
        case 'mechanic':
          return 'Механик инженер'
      }
    }
    switch (user?.job) {
      case 'driver':
        return 'Жолооч'
      case 'engineer':
        return 'ХАБЭА ажилтан'
      case 'manager':
        return 'Тээвэр зохицуулагч'
      case 'mechanic':
        return 'Механик инженер'
    }
  }

  const styles = StyleSheet.create({
    acceptButton: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 6,
    },
    container: {
      gap: 20,
    },
    iconStyle: {
      color: theme.text,
    },
    inputContainer: {
      gap: 6,
    },
    inputStyle: {
      alignItems: 'center',
      backgroundColor: theme.lightBg,
      borderRadius: 10,
      flexDirection: 'row',
      gap: 28,
      padding: 15,
      width: '100%',
    },
    inputText: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    inputTextDark: {
      color: theme.iconBg,
      fontFamily: theme.nunito800,
      fontSize: 15,
    },
    labelStyle: {
      color: theme.darktext,
      fontFamily: theme.nunito800,
      fontSize: 12,
    },
    rejectButton: {
      backgroundColor: theme.red,
      flex: 1,
    },
  })

  return (
    <CustomModal
      title='Хэрэглэгчийн мэдээлэл засах хүсэлт'
      visible={modalVisible}
      setVisible={setModalVisible}
      keyboardAvoidValue={100}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Хэрэглэгчийн овог</Text>
          <View style={styles.inputStyle}>
            {request?.change?.lastname ? (
              <>
                <Text style={styles.inputTextDark}>{user?.lastname}</Text>
                <RightLineIcon style={styles.iconStyle} />
                <Text style={styles.inputText}>
                  {request?.change?.lastname}
                </Text>
              </>
            ) : (
              <Text style={styles.inputText}>{user?.lastname}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Хэрэглэгчийн нэр</Text>
          <View style={styles.inputStyle}>
            {request?.change?.firstname ? (
              <>
                <Text style={styles.inputTextDark}>{user?.firstname}</Text>
                <RightLineIcon style={styles.iconStyle} />
                <Text style={styles.inputText}>
                  {request?.change?.firstname}
                </Text>
              </>
            ) : (
              <Text style={styles.inputText}>{user?.firstname}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Утасны дугаар</Text>
          <View style={styles.inputStyle}>
            {request?.change?.phoneNumber ? (
              <>
                <Text style={styles.inputTextDark}>{user?.phoneNumber}</Text>
                <RightLineIcon style={styles.iconStyle} />
                <Text style={styles.inputText}>
                  {request?.change?.phoneNumber}
                </Text>
              </>
            ) : (
              <Text style={styles.inputText}>{user?.phoneNumber}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Албан тушаал</Text>
          <View style={styles.inputStyle}>
            {request?.change?.job ? (
              <>
                <Text style={styles.inputTextDark}>{getJobName()}</Text>
                <RightLineIcon style={styles.iconStyle} />
                <Text style={styles.inputText}>
                  {getJobName(request?.change?.job)}
                </Text>
              </>
            ) : (
              <Text style={styles.inputText}>{getJobName()}</Text>
            )}
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelStyle}>Шалтгаан</Text>
          <View style={styles.inputStyle}>
            <Text style={styles.inputText}>{request?.change?.reason}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <SubmitButton
            style={styles.acceptButton}
            title='Зөвшөөрөх'
            loading={loading}
            onSubmit={() => setModalVisible(false)}
            onPress={handleSubmit}
          />
          <SubmitButton
            style={styles.rejectButton}
            title='Татгалзах'
            loading={loadingError}
            onSubmit={() => setModalVisible(false)}
            onPress={handleReject}
          />
        </View>
      </View>
    </CustomModal>
  )
}
