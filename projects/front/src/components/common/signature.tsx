//TODO seperate this code for android and ios

import React, { useRef } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'
import SignatureScreen from 'react-native-signature-canvas'

interface SignatureTypes {
  cardView?: boolean
  job: string
  name: string
  title?: string
  signature?: unknown
  onOK?: (_signature: string) => void
}

export const SignatureCard: React.FC<SignatureTypes> = ({
  cardView = false,
  job,
  name,
  title,
  onOK,
}) => {
  const { theme } = useTheme()

  const ref = useRef<{
    readSignature: () => void
    clearSignature: () => void
    getData: () => Promise<string>
  }>(null)

  const handleOK = (signature: string) => {
    console.log(signature)
    if (onOK) {
      onOK(signature)
    }
  }

  const handleEnd = () => {
    ref.current?.readSignature()
  }

  const handleEmpty = () => {
    console.log('Empty')
  }

  const handleClear = () => {
    console.log('Clear success!')
  }

  const handleData = (data: string) => {
    console.log(data)
  }

  const styles = StyleSheet.create({
    aboutSignature: {
      gap: 10,
    },
    cardContainer: {
      backgroundColor: theme.lightBg,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      gap: 8,
      padding: 12,
    },
    cardName: {
      color: theme.text,
      fontFamily: theme.nunito800,
      fontSize: 14,
    },
    cardSignature: {
      backgroundColor: theme.text,
      borderRadius: 10,
      height: 186,
      width: '100%',
    },
    cardSubtitle: {
      color: theme.darktext,
      fontFamily: theme.commi700,
      fontSize: 12,
    },
    cardTitleContainer: {
      gap: 4,
      paddingHorizontal: 8,
    },
    container: {
      gap: 10,
    },
    signature: {
      backgroundColor: theme.text,
      borderRadius: 10,
      height: 110,
      width: 120,
    },
    signatureContainer: {
      flexDirection: 'row',
      gap: 24,
    },
    signatureName: {
      color: theme.text,
      fontFamily: theme.commi600,
      fontSize: 13,
    },
    signatureSubTitle: {
      color: theme.darktext,
      fontFamily: theme.commi600,
      fontSize: 12,
    },
    signatureTitle: {
      color: theme.text,
      fontFamily: theme.commi700,
      fontSize: 16,
    },
  })

  return !cardView ? (
    <View style={styles.container}>
      {title && <Text style={styles.signatureTitle}>{title}</Text>}
      <View style={styles.signatureContainer}>
        <View style={styles.aboutSignature}>
          <SignatureScreen
            ref={ref as any} //TODO change it to specific type other than any
            onEnd={handleEnd}
            onOK={handleOK}
            onEmpty={handleEmpty}
            onClear={handleClear}
            onGetData={handleData}
            autoClear={false}
            descriptionText='Sign here'
            webStyle={`.m-signature-pad--footer .button { background-color: ${theme.text}; color: white; }`}
            style={styles.signature}
          />
          <Text style={styles.signatureSubTitle}>Гарын үсэг:</Text>
        </View>
        <View style={styles.aboutSignature}>
          <Text style={styles.signatureSubTitle}>Албан тушаал, нэр:</Text>
          <Text style={styles.signatureName}>{name}</Text>
          <Text style={styles.signatureName}>/{job}/</Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.cardContainer}>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardSubtitle}>{job}</Text>
        <Text style={styles.cardName}>{name}</Text>
      </View>
      <Text style={styles.cardSubtitle}>Гарын үсэг:</Text>
      <View style={styles.cardSignature}>
        <SignatureScreen
          ref={ref as any} //TODO change it to specific type other than any
          onEnd={handleEnd}
          onOK={handleOK}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          autoClear={false}
          descriptionText='Sign here'
          webStyle={`.m-signature-pad--footer .button { background-color: ${theme.text}; color: white; }`}
          style={styles.cardSignature}
        />
      </View>
    </View>
  )
}
