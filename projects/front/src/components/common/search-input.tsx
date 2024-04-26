import React, { useRef } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  TextInputProps,
  Text,
  Dimensions,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { TextInput } from 'react-native-gesture-handler'
import { SearchIcon } from '../../assets/icons/'

type SearchInputType = {
  editable?: boolean
  placeholder?: string
  value: string
  setValue: (_v: string) => void
  style?: object
  focused?: boolean
  setFocused?: (_v: boolean) => void
}

export const SearchInput: React.FC<SearchInputType & TextInputProps> = ({
  placeholder = 'Хайх',
  setValue,
  value,
  editable = true,
  style,
  focused,
  setFocused,
  ...other
}) => {
  const { theme } = useTheme()
  const screenWidth = Dimensions.get('window').width - 40 //* Screen width minus padding
  const amountToRemove = 46 //* Size of close button
  const animatedWidth = useRef(new Animated.Value(screenWidth)).current
  const inputRef = useRef<TextInput>(null)

  const handleValueChange = (text: string) => {
    setValue(text)
  }

  const handleFocus = () => {
    setFocused && setFocused(true)
    setFocused &&
      Animated.timing(animatedWidth, {
        toValue: screenWidth - amountToRemove,
        duration: 200,
        useNativeDriver: false,
      }).start()
  }

  const handleClear = () => {
    setFocused && setFocused(false)
    inputRef.current?.blur()
    Animated.timing(animatedWidth, {
      toValue: screenWidth,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  const styles = StyleSheet.create({
    closeButton: {
      color: theme.text,
      fontSize: 14,
      fontWeight: '700',
      padding: 10,
      textAlign: 'right',
      width: '100%',
    },
    container: {
      flex: !setFocused ? 1 : 0,
      flexDirection: 'row',
    },
    input: {
      color: theme.darktext,
      flexGrow: 1,
      fontFamily: theme.nunito800,
      fontSize: 12,
      padding: 12,
    },
    inputContainer: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: theme.lightBg,
      borderColor: theme.lightBg,
      borderRadius: 10,
      borderWidth: 1,
      flexDirection: 'row',
      paddingLeft: 14,
      width: setFocused && animatedWidth,
    },
  })

  return (
    <View style={styles.container}>
      <Animated.View style={styles.inputContainer}>
        <SearchIcon />
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleValueChange}
          style={{ ...styles.input, ...style }}
          placeholderTextColor={theme.darktext}
          placeholder={placeholder}
          autoCapitalize='none'
          editable={editable}
          onFocus={handleFocus}
          selectionColor={theme.white}
          {...other}
        />
      </Animated.View>
      {focused && (
        <TouchableOpacity onPress={handleClear}>
          <Text style={styles.closeButton}>Хаах</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
