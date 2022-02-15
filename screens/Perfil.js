import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";

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

class Perfil extends React.Component {
  constructor(props) {
    super(props);
    this.pickerResult;

    this.state = {
      openModal: false
    }

    setOpenModal = (valor) => {
      this.setState({ openModal: valor })

    }

    this.openImagePickerAsync = async () => {
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


  render() {
    const { navigation } = this.props;

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
                  <TouchableOpacity onPress={() => {
                    setOpenModal(true);
                  }}>
                    <Image
                      source={Images.PerfilImagem}
                      style={styles.avatar}
                    />
                    {this.state.openModal &&
                      <Modal
                        style={styles.btnModal}
                        animationType="slide"
                        transparent={false}
                        visible={this.state.openModal}
                      >
                        <Text>Um simples texto</Text>
                        <TouchableOpacity
                          style={styles.btnCameras}
                          onPress={() => {
                            this.openImagePickerAsync();
                          }}><Text style={styles.modalText}>GALERIA</Text></TouchableOpacity>
                        <TouchableOpacity
                          style={styles.btnCameras}
                          onPress={() => {
                            navigation.navigate("Camera");
                          }}><Text style={styles.modalText}>CÂMERA</Text></TouchableOpacity>
                        <TouchableOpacity
                          style={styles.btnCameras}
                          onPress={() => {
                            setOpenModal(false);
                          }}><Text style={styles.modalText}>VOLTAR</Text></TouchableOpacity>
                      </Modal>
                    }
                  </TouchableOpacity>
                </Block>
                <Block style={styles.info}>
                  <Block
                    middle
                    row
                    space="evenly"
                    style={{ marginTop: 20, paddingBottom: 24 }}
                  >
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
                    >
                      CONECTAR
                    </Button>
                    <Button
                      small
                      style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
                    >
                      MENSAGEM
                    </Button>
                  </Block>
                  <Block row space="between">
                    <Block middle>
                      <Text
                        bold
                        size={18}
                        color="#525F7F"
                        style={{ marginBottom: 4 }}
                      >
                        2.000
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
                        10
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
                        89
                      </Text>
                      <Text size={12} color={argonTheme.COLORS.TEXT}>Comentários</Text>
                    </Block>
                  </Block>
                </Block>
                <Block flex>
                  <Block middle style={styles.nameInfo}>
                    <Text bold size={28} color="#32325D">
                      Miguel Domingos, 26
                    </Text>
                    <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                      Ndombe Grande, Angola
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
                      Sou cantor e fasso um estilo de música que é o rapper
                    </Text>
                    <Button
                      color="transparent"
                      textStyle={{
                        color: "#9D0C60",
                        fontWeight: "500",
                        fontSize: 16
                      }}
                    >
                      Mostrar mais
                    </Button>
                  </Block>
                  <Block
                    row
                    space="between"
                  >
                    <Text bold size={16} color="#525F7F" style={{ marginTop: 12 }}>
                      Album
                    </Text>
                    <Button
                      small
                      color="transparent"
                      textStyle={{ color: "#9D0C60", fontSize: 12, marginLeft: 24 }}
                    >
                      Ver tudo
                    </Button>
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
        {/* <ScrollView showsVerticalScrollIndicator={false} 
                    contentContainerStyle={{ flex: 1, width, height, zIndex: 9000, backgroundColor: 'red' }}>
        <Block flex style={styles.profileCard}>
          <Block middle style={styles.avatarContainer}>
            <Image
              source={{ uri: Images.ProfilePicture }}
              style={styles.avatar}
            />
          </Block>
          <Block style={styles.info}>
            <Block
              middle
              row
              space="evenly"
              style={{ marginTop: 20, paddingBottom: 24 }}
            >
              <Button small style={{ backgroundColor: argonTheme.COLORS.INFO }}>
                CONNECT
              </Button>
              <Button
                small
                style={{ backgroundColor: argonTheme.COLORS.DEFAULT }}
              >
                MESSAGE
              </Button>
            </Block>

            <Block row space="between">
              <Block middle>
                <Text
                  bold
                  size={12}
                  color="#525F7F"
                  style={{ marginBottom: 4 }}
                >
                  2K
                </Text>
                <Text size={12}>Orders</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  10
                </Text>
                <Text size={12}>Photos</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{ marginBottom: 4 }}>
                  89
                </Text>
                <Text size={12}>Comments</Text>
              </Block>
            </Block>
          </Block>
          <Block flex>
              <Block middle style={styles.nameInfo}>
                <Text bold size={28} color="#32325D">
                  Jessica Jones, 27
                </Text>
                <Text size={16} color="#32325D" style={{ marginTop: 10 }}>
                  San Francisco, USA
                </Text>
              </Block>
              <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                <Block style={styles.divider} />
              </Block>
              <Block middle>
                <Text size={16} color="#525F7F" style={{ textAlign: "center" }}>
                  An artist of considerable range, Jessica name taken by
                  Melbourne …
                </Text>
                <Button
                  color="transparent"
                  textStyle={{
                    color: "#233DD2",
                    fontWeight: "500",
                    fontSize: 16
                  }}
                >
                  Show more
                </Button>
              </Block>
              <Block
                row
                style={{ paddingVertical: 14, alignItems: "baseline" }}
              >
                <Text bold size={16} color="#525F7F">
                  Album
                </Text>
              </Block>
              <Block
                row
                style={{ paddingBottom: 20, justifyContent: "flex-end" }}
              >
                <Button
                  small
                  color="transparent"
                  textStyle={{ color: "#5E72E4", fontSize: 12 }}
                >
                  View all
                </Button>
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
                  </ScrollView>*/}
      </Block>
    );
  }
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

export default Perfil;
