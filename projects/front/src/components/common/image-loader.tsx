import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

type ImageLoaderType = {
  images: string[]
}

export const ImageLoader: React.FC<ImageLoaderType> = ({ images }) => {
  const styles = StyleSheet.create({
    container: {
      zIndex: -1,
    },
    imageBaseStyle: {
      flex: 1,
    },
    imageColumnContainer: {
      gap: 4,
      zIndex: -1,
    },
    imageContainer: {
      flexDirection: 'row',
      gap: 4,
      zIndex: -1,
    },
    imageOutsideStyle: {
      height: 312,
    },
    imageOutsideStyleBig: {
      height: 312,
      width: '60%',
    },
    imageOutsideStyleBottom: {
      height: 130,
    },
    imageOutsideStyleTop: {
      height: 172,
    },
    imageStyle: {
      height: '100%',
      width: '100%',
    },
    imageStyleSecond: {
      gap: 4,
      width: '40%',
    },
  })

  return (
    <View style={styles.container}>
      {images.length <= 2 ? (
        <View style={styles.imageContainer}>
          {images.map((e, i) => {
            return (
              <Image
                style={[styles.imageOutsideStyle, styles.imageBaseStyle]}
                src={e}
                key={i}
              />
            )
          })}
        </View>
      ) : images.length <= 4 ? (
        <View style={styles.imageContainer}>
          <Image src={images[0]} style={styles.imageOutsideStyleBig} />
          <View style={styles.imageStyleSecond}>
            {images.map((e, i) => {
              if (i != 0) {
                return (
                  <View key={i} style={styles.imageBaseStyle}>
                    <Image style={styles.imageStyle} src={e} key={i} />
                  </View>
                )
              }
            })}
          </View>
        </View>
      ) : (
        <View style={styles.imageColumnContainer}>
          <View style={styles.imageContainer}>
            <Image
              src={images[0]}
              style={[styles.imageOutsideStyleTop, styles.imageBaseStyle]}
            />
            <Image
              src={images[1]}
              style={[styles.imageOutsideStyleTop, styles.imageBaseStyle]}
            />
          </View>
          <View style={styles.imageContainer}>
            {images.map((e, i) => {
              return (
                i >= 2 && (
                  <View
                    key={i}
                    style={[
                      styles.imageOutsideStyleBottom,
                      styles.imageBaseStyle,
                    ]}
                  >
                    <Image style={styles.imageStyle} src={e} key={i} />
                  </View>
                )
              )
            })}
          </View>
        </View>
      )}
    </View>
  )
}
