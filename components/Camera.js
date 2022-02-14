import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import { useState } from 'react';
import { useRef } from 'react';
import { Camera } from 'expo-camera';
import { useEffect } from 'react';


export default function CameraPhotoPerfil() {

  const camRef = useRef(null);
  const [typeCamera, setTypeCamera] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
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
      const data  = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri )
      setOpen(true);
      console.log(data);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        style={{ flex: 1, height: 200 }}
        type={typeCamera}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
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
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
            <TouchableOpacity style = {{margin: 10}}
              onPress= {() => setOpen(false)} >
              <Text>Fechar</Text>
            </TouchableOpacity>

            <Image
              style={{width:"100%", height:300, borderRadius: 20}}
              source={{uri: capturedPhoto}}
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
  },
});
