import React from 'react'
import {
  Text,
  StyleSheet,
  Modal,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  DimensionValue,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { CloseOutlinedIcon } from '../../assets/icons'

type CustomModalProps = {
  title: string
  children: React.ReactNode[] | React.ReactNode
  visible: boolean
  setVisible: (_v: boolean) => void
  keyboardAvoidValue?: number
  setKeyboardAvoidValue?: (_v: number) => void
  height?: DimensionValue
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  visible,
  setVisible,
  keyboardAvoidValue = 0,
  height,
}) => {
  const { theme } = useTheme()

  const handleCloseModal = () => {
    setVisible(false)
  }

  const styles = StyleSheet.create({
    closeIcon: {
      color: theme.iconBg,
      height: 20,
      width: 20,
    },
    content: {
      padding: 20,
      paddingVertical: 26,
    },
    modalContainer: {
      height: '100%',
      justifyContent: 'flex-end',
      width: '100%',
    },
    modalHeader: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: theme.stroke,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      paddingVertical: 24,
    },
    modalSafeContainer: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: height && height,
      width: '100%',
    },
    modalTitle: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '800',
    },
    transparentModal: {
      backgroundColor: theme.lightBg,
      height: '100%',
      opacity: 0.8,
      position: 'absolute',
      width: '100%',
    },
  })

  return (
    <Modal
      onRequestClose={handleCloseModal}
      animationType='slide'
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'height' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? keyboardAvoidValue : 0}
      >
        <Pressable onPress={handleCloseModal} style={styles.transparentModal} />
        <View style={styles.modalSafeContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={handleCloseModal}>
              <CloseOutlinedIcon style={styles.closeIcon} />
            </Pressable>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}
