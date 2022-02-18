import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { useState } from 'react';
import { useRef } from 'react';
import { Camera } from 'expo-camera';
import { useEffect } from 'react';

import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { db, auth, cloudStorage } from '../firebase/Database';


export default function CameraPhotoPerfil() {

  const camRef = useRef(null);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted')
    })();


    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted')
    })();

  }, [])

  if (hasPermission === null) {
    return <View />
  }

  if (hasPermission === false) {
    return <Text>Acesso negado!</Text>
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri)

      setOpen(true);
      //console.log(data);
    }
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        alert("Salvo com sucesso")
        
        
        //console.log(filename)
        //console.log("ohoo");

        setUploading(true);

        

        
        /*db.collection('users').doc(auth.currentUser.uid)
          .update({
            imgUrl: capturedPhoto
          }).then(() => {
            console.log("Document successfully updated!");
        })
        */


      })
      .catch((error) => {
        console.log('err', error)
      })

      try {
        //cloudStorage.ref(filename).putFile(uploadUri);
        const uploadUri = capturedPhoto;

        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        let r = cloudStorage.ref().child(filename);
        console.log(r.putFile());
        setUploading(false);
        
        alert("Image uploaded");
      } catch (e) {
        console.log(e)
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1, height: 200 }}
        type={typeCamera}
        ref={camRef}
      >
        <View style={styles.btnCameras}>
          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
          }}

            onPress={() => {
              setTypeCamera(
                typeCamera === Camera.Constants.Type.back ?
                  Camera.Constants.Type.front : Camera.Constants.Type.back
              )
            }}>
            <Text>Trocar Câmera</Text>
          </TouchableOpacity>
        </View>

      </Camera>
      <TouchableOpacity

        style = {styles.btnCameras}
        onPress={() => {
          takePicture();
        }}
      >

        <Text>Tirar Foto</Text>
      </TouchableOpacity>

      {
        capturedPhoto &&
        <Modal
          animationType="slide"
          transparent={false}
          visible={open}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <TouchableOpacity style={{ margin: 10 }}
              onPress={() => setOpen(false)} >
              <Text>Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 10 }}
              onPress={() => savePicture()} >
              <Text>Guardar foto</Text>
            </TouchableOpacity>

            <Image
              style={{ width: "100%", height: 300, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            >
            </Image>
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  btnCameras: {
    color: 'white',
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: 'auto'
  }
});
