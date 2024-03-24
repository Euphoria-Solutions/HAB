import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Animated, Easing } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { PlusIcon, RightArrowIcon } from '../../assets/icons'

type ListItem = {
  value: string
  label: string
}
type DropdownListProps = {
  value?: ListItem[]
  options?: ListItem[]
}

export const DropdownList: React.FC<DropdownListProps> = ({
  value,
  options: o,
}) => {
  const { theme } = useTheme()
  const [list, setList] = useState<ListItem[]>(value ? value : [])
  const [visible, setVisible] = useState(-1)
  const [options, setOptions] = useState<ListItem[]>([])
  const fadeAnim = useRef(new Animated.Value(0)).current
  const translateYAnim = useRef(new Animated.Value(-10)).current

  useEffect(() => {
    if (o) {
      setOptions(o)
    } else {
      setOptions([
        {
          label: 'Бээлий',
          value: 'gloves',
        },
        {
          label: 'Дугуй',
          value: 'wheels',
        },
        {
          label: 'Бөөрийнхий',
          value: 'circle',
        },
      ])
    }
  }, [o])
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: visible >= 0 ? 1 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: visible >= 0 ? 0 : -10,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start()
  }, [visible, fadeAnim, translateYAnim])

  const handleDropdownChange = (item: ListItem) => {
    const temp = [...list]
    temp[visible].label = visible + 1 + ': ' + item.label
    temp[visible].value = item.value

    setList(temp)
    setVisible(-1)
  }
  const toggleDropdown = (e: number) => {
    if (visible == e) {
      setVisible(-1)
      return
    }
    setVisible(e)
  }
  const addDropdownOption = () => {
    const newItem = { label: '', value: '' }
    newItem.label = list.length + 1 + ':'
    setList(prev => [...prev, newItem])
  }

  const styles = StyleSheet.create({
    addOptionHeader: {
      flexDirection: 'row',
      gap: 6,
      padding: 16,
    },
    addOptionText: {
      color: theme.darktext,
      fontSize: 13,
      fontWeight: '800',
    },
    container: {
      backgroundColor: theme.lightBg,
      borderRadius: 10,
      position: 'relative',
    },
    divider: {
      backgroundColor: theme.border,
      height: 1,
      marginHorizontal: 12,
    },
    dropdownHeader: {
      flexDirection: 'row',
      height: 48,
      justifyContent: 'space-between',
      padding: 16,
    },
    dropdownText: {
      color: theme.text,
      fontSize: 13,
      fontWeight: '800',
    },
    optionItem: {
      marginTop: -1,
      padding: 16,
    },
    optionsContainer: {
      backgroundColor: theme.darkBg,
      borderRadius: 10,
      flex: 1,
      opacity: fadeAnim,
      position: 'absolute',
      right: 10,
      top: 36 + 49 * visible,
      transform: [{ translateY: translateYAnim }],
      zIndex: 30,
    },
  })

  return (
    <View style={styles.container}>
      {list?.map((item, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={() => toggleDropdown(i)}
            style={styles.dropdownHeader}
          >
            <Text
              style={item.value ? styles.dropdownText : styles.addOptionText}
            >
              {item.label}
            </Text>
            <RightArrowIcon
              style={item.value ? styles.dropdownText : styles.addOptionText}
            />
          </TouchableOpacity>
          {i < list.length && <View style={styles.divider} />}
        </View>
      ))}
      <View>
        <TouchableOpacity
          onPress={addDropdownOption}
          style={styles.addOptionHeader}
        >
          <PlusIcon style={styles.addOptionText} />
          <Text style={styles.addOptionText}>Нэмэx</Text>
        </TouchableOpacity>
      </View>
      {visible >= 0 && (
        <Animated.View style={styles.optionsContainer}>
          {options.map((item, i) => (
            <View key={i}>
              <TouchableOpacity
                onPress={() => handleDropdownChange(item)}
                style={styles.optionItem}
              >
                <Text style={styles.dropdownText}>{item.label}</Text>
              </TouchableOpacity>
              {i < options.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  )
}
