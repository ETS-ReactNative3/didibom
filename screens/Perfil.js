import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  FlatList,
  View
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { getUserInfo } from "../firebase/Database";

// Alteração para commit

import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { Modal } from 'react-native'
import CameraPhotoPerfil from "../components/Camera";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';


const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export default function Perfil({ navigation }) {


  const [openModal, setOpenModal] = useState(false);


  const [DATA, setData] = useState(null);

  let pickerResult;

  function imagePickerCallback() {

  }

  const getElements = async () => {
    try {
      const info = await getUserInfo();
      setData(info);
    } catch (error) {
      console.log(error);
    } finally {
    }

    const openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      this.pickerResult = await ImagePicker.launchImageLibraryAsync();
      console.log(pickerResult);

    }
    async function savePicture() {

    }

  }

  useEffect(() => {
    getElements();
  }, []);

  return (
    <Block flex style={styles.perfil}>
      <Block flex>
        <ImageBackground
          source={Images.PerfilBackground}
          style={styles.perfilContainer}
          imageStyle={styles.perfilBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: '25%' }}
          >
            <Block flex style={styles.perfilCard}>
              <Block middle style={styles.avatarContainer}>
                {(<FlatList
                  data={DATA}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() =>
                      setOpenModal(true)
                    }>
                      <Image
                        source={{ uri: item.imgUrl }}
                        style={styles.avatar}
                      />
                    </TouchableOpacity>
                  )}
                />)}

                <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', height: '100%' }}>
                  {openModal &&
                    <Modal
                      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}
                      animationType="slide"
                      transparent={false}
                      visible={openModal}
                    >
                      {/*<Button style={{alignSelf: 'center'}} onPress={() => {
                            openImagePickerAsync();
                          }} >Galeria</Button>
                          */}
                      <Button style={{ alignSelf: 'center' }} onPress={() => {
                        navigation.navigate("Camera");
                      }} >Câmera</Button>
                      <Button style={{ alignSelf: 'center' }} onPress={() => {
                        setOpenModal(false);
                      }} >Voltar</Button>

                    </Modal>
                  }
                </View>

              </Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                >
                </Block>
                <Block row space="between">
                  <Block middle>
                    <Text
                      bold
                      size={18}
                      color="#525F7F"
                      style={{ marginBottom: 4 }}
                    >
                      0
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Conexões</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      6
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Fotos</Text>
                  </Block>
                  <Block middle>
                    <Text
                      bold
                      color="#525F7F"
                      size={18}
                      style={{ marginBottom: 4 }}
                    >
                      0
                    </Text>
                    <Text size={12} color={argonTheme.COLORS.TEXT}>Comentários</Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  {(<FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                      <Text bold size={28} color="#32325D">
                        {item.name}
                      </Text>
                    )}
                  />)}

                  <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                    Luanda, Angola
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    Amo Comida
                  </Text>

                </Block>
                <Block
                  row
                  space="between"
                >
                  <Text bold size={16} color="#525F7F" style={{ marginTop: 12 }}>
                    Album
                  </Text>
                </Block>
                <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
                  <Block row space="between" style={{ flexWrap: "wrap" }}>
                    {Images.Viewed.map((img, imgIndex) => (
                      <Image
                        source={{ uri: img }}
                        key={`viewed-${img}`}
                        resizeMode="cover"
                        style={styles.thumb}
                      />
                    ))}
                  </Block>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  perfil: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  perfilContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  perfilBackground: {
    width: width,
    height: height / 2
  },
  perfilCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  },
  btnCameras: {
    backgroundColor: argonTheme.COLORS.DEFAULT,
    marginBottom: 10,
    padding: 20

  },
  btnModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  modalText: {
    color: 'white'
  }
});