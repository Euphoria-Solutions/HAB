import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { storage } from '../firebase/init'

export const uploadImage = async (
  uri: string,
  imageName: string
): Promise<string | null> => {
  try {
    const response = await fetch(uri)
    const blob = await response.blob()

    const storageRef = ref(storage, `images/${imageName}`)
    const uploadTask = uploadBytesResumable(storageRef, blob)

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          console.log(
            'Progress: ',
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        },
        error => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL)
          })
        }
      )
    })
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
}
