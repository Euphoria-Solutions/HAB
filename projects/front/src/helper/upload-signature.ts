import * as FileSystem from 'expo-file-system'

export const handleOK = (signature: string) => {
  const path = FileSystem.cacheDirectory + 'sign.png'
  FileSystem.writeAsStringAsync(
    path,
    signature.replace('data:image/png;base64,', ''),
    { encoding: FileSystem.EncodingType.Base64 }
  )
    .then(() => FileSystem.getInfoAsync(path))
    .then(console.log)
    .catch(console.error)
}
