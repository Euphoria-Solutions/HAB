import React from 'react'
import { DimensionValue, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import { ConfirmIcon } from '../../assets/icons'

type IndicatorTypes = {
  state: 'waiting' | 'being processed' | 'finished' | 'empty'
  size?: DimensionValue
  style?: object
  title?: string
}

export const Indicator: React.FC<IndicatorTypes> = ({
  state,
  style,
  size,
  title,
}) => {
  const { theme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    indicatorContainer: {
      alignItems: 'center',
      backgroundColor:
        state == 'waiting'
          ? theme.red
          : state == 'finished'
            ? theme.green
            : state == 'being processed'
              ? theme.yellow
              : undefined,
      borderColor: state == 'empty' ? theme.lightBg : undefined,
      borderRadius: 100,
      borderWidth: state == 'empty' ? 2 : undefined,
      height: size ? size : 15,
      justifyContent: 'center',
      padding: state == 'being processed' ? 2 : 0,
      width: size ? size : 15,
    },
    processingIndicator: {
      borderColor: theme.text,
      borderRadius: 100,
      borderWidth: 2,
      height: '100%',
      width: '100%',
    },
    stateIndicator: {
      color: theme.text,
      height: '60%',
      textAlign: 'center',
      width: '60%',
    },
    titleStyle: {
      color: theme.text,
      fontSize: 12,
      fontWeight: '600',
    },
  })

  return (
    <View style={styles.container}>
      <View style={style ? style : styles.indicatorContainer}>
        {state == 'waiting' ? (
          <Text style={styles.stateIndicator}>!</Text>
        ) : state == 'finished' ? (
          <ConfirmIcon style={styles.stateIndicator} />
        ) : (
          state == 'being processed' && (
            <View style={styles.processingIndicator} />
          )
        )}
      </View>
      {title && <Text style={styles.titleStyle}>{title}</Text>}
    </View>
  )
}
