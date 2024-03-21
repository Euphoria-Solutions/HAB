import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useTheme } from '../../theme/theme-provider'

export interface SignatureTypes {
  cardView?: boolean
  job: string
  name: string
  title?: string
  signature?: unknown
}

export const SignatureCard: React.FC<SignatureTypes> = ({
  cardView = false,
  job,
  name,
  title,
}) => {
  const { theme } = useTheme()

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
      fontSize: 14,
      fontWeight: '800',
    },
    cardSignature: {
      backgroundColor: theme.text,
      borderRadius: 10,
      height: 186,
      width: '100%',
    },
    cardSubtitle: {
      color: theme.darktext,
      fontSize: 12,
      fontWeight: '700',
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
      fontSize: 13,
      fontWeight: '600',
    },
    signatureSubTitle: {
      color: theme.darktext,
      fontSize: 12,
      fontWeight: '600',
    },
    signatureTitle: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '700',
    },
  })

  return !cardView ? (
    <View style={styles.container}>
      {title && <Text style={styles.signatureTitle}>{title}</Text>}
      <View style={styles.signatureContainer}>
        <View style={styles.aboutSignature}>
          <View style={styles.signature} />
          <Text style={styles.signatureSubTitle}>Гарын үсэг:</Text>
        </View>
        <View style={styles.aboutSignature}>
          <Text style={styles.signatureSubTitle}>Албан тушаал, нэр:</Text>
          <Text style={styles.signatureName}>
            {name} /{job}/
          </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.cardContainer}>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardSubtitle}>Гүйцэтгэсэн {job.toLowerCase()}</Text>
        <Text style={styles.cardName}>{name}</Text>
      </View>
      <View style={styles.cardSignature} />
      <Text style={styles.cardSubtitle}>Гарын үсэг:</Text>
    </View>
  )
}
