import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CameraIcon } from '../../assets/icons'

export const ChangeProfilePicture: React.FC = () => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    changeProfileIcon: {
      backgroundColor: theme.primary,
      color: theme.text,
      marginHorizontal: 7,
      marginVertical: 8,
    },
    changeProfilePicture: {
      backgroundColor: theme.primary,
      borderColor: theme.bg,
      borderRadius: 100,
      borderWidth: 4,
      bottom: -4,
      position: 'absolute',
      right: -4,
    },
    profilePicture: {
      backgroundColor: theme.text,
      borderRadius: 35,
      height: 70,
      position: 'relative',
      width: 70,
    },
    profilePictureContainer: {
      alignItems: 'center',
      marginBottom: 6,
    },
  })

  return (
    <View style={styles.profilePictureContainer}>
      <View style={styles.profilePicture}>
        <View style={styles.changeProfilePicture}>
          <TouchableOpacity>
            <CameraIcon style={styles.changeProfileIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
