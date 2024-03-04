import React from 'react'
import { Text, StyleSheet, Modal, View, Pressable } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CloseOutlinedIcon } from '../../assets/icons'

type CustomModalProps = {
  title: string
  children: React.ReactNode[] | React.ReactNode
  visible: boolean
  setVisible: (_v: boolean) => void
}

export const CustomModal: React.FC<CustomModalProps> = ({
  title,
  children,
  visible,
  setVisible,
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
      borderColor: theme.border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      paddingVertical: 24,
    },
    modalSafeContainer: {
      backgroundColor: theme.bg,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
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
      <View style={styles.modalContainer}>
        <Pressable onPress={handleCloseModal} style={styles.transparentModal} />
        <SafeAreaView style={styles.modalSafeContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={handleCloseModal}>
              <CloseOutlinedIcon style={styles.closeIcon} />
            </Pressable>
          </View>
          <View style={styles.content}>{children}</View>
        </SafeAreaView>
      </View>
    </Modal>
  )
}
