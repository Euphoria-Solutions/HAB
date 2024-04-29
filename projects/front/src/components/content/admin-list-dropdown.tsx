import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { MiniDropdown } from '../common'
import { useTheme } from '../../theme/theme-provider'
import { MoreIcon, PenIcon, TrashIcon } from '../../assets/icons'
import { RootAdminStackParamList, useNav } from '../../navigation'
import { StackNavigationProp } from '@react-navigation/stack'

type AdminListDropdownType = {
  data: { id: string | number }
  deleteData: (_i: number | string) => void
  navigation: StackNavigationProp<
    RootAdminStackParamList,
    'Workers' | 'Cars' | 'Schedule'
  >
  index: number
  navigateScreen: 'AddWorker' | 'AddCar' | 'AddSchedule'
}

export const AdminListDropdown: React.FC<AdminListDropdownType> = ({
  data,
  deleteData,
  navigation,
  index,
  navigateScreen,
}) => {
  const { theme } = useTheme()
  const { setId } = useNav()
  const [visible, setVisible] = useState(false)

  const styles = StyleSheet.create({
    activatorStyle: {
      color: theme.text,
      zIndex: -1,
    },
    deleteIcon: {
      color: theme.red,
    },
    editIcon: {
      color: theme.text,
    },
  })

  return (
    <View style={{ zIndex: -1 - index, elevation: -1 - index }}>
      <MiniDropdown
        visible={visible}
        setVisible={setVisible}
        options={[
          {
            icon: <TrashIcon style={styles.deleteIcon} />,
            label: 'Устгах',
            function: () => {
              deleteData(data.id)
            },
            style: styles.deleteIcon,
          },
          {
            icon: <PenIcon style={styles.editIcon} />,
            label: 'Засах',
            function: () => {
              setId(typeof data.id == 'string' ? data.id : data.id.toString())
              navigation.navigate(navigateScreen)
            },
          },
        ]}
        activator={<MoreIcon style={styles.activatorStyle} />}
      />
    </View>
  )
}
