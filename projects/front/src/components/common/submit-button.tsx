import React, { useEffect, useRef, useState } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import LottieView from 'lottie-react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  loading: boolean
  onSubmit: () => void
}

export const SubmitButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  loading,
  disabled = false,
  onSubmit,
}) => {
  const { theme } = useTheme()
  const [playing, setPlaying] = useState(false)
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    if (animationRef.current != null) {
      if (loading) {
        animationRef.current.play()
        setPlaying(true)
      } else if (playing) {
        onSubmit()
        animationRef.current.reset()
      }
    }
  }, [loading])

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: disabled ? theme.primaryDisabled : theme.primary,
      borderRadius: 24,
      padding: 15,
    },
    buttonText: {
      color: theme.white,
      display: !loading ? 'flex' : 'none',
      fontFamily: theme.nunito800,
      fontSize: 18,
    },
    lottieLoading: {
      display: loading ? 'flex' : 'none',
      height: 22,
      width: 22,
    },
  })

  return (
    <TouchableOpacity
      disabled={loading || disabled}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <LottieView
        style={styles.lottieLoading}
        ref={animationRef}
        source={require('../../assets/lotties/loading-animation.json')}
        autoPlay={false}
        loop={true}
      />
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}
