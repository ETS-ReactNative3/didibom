import React, { useState, shouldComponentUpdate } from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, View } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch, Card, ModalComponent } from "../components";

import { useNavigation } from "@react-navigation/native";

import articles from '../constants/articles';
import data from "../assets/data";
import CustomSlider from "../components/CustomSlider";
import { useEffect } from "react";

const { width } = Dimensions.get("screen");



export default function Schedule({ route }) {

  useEffect(() => {

  },[]);

  const { navigation } = useNavigation();
  const { name, imgUrl } = route.params;

  return (
    <Block flex center>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
        <Block flex>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Card item={{ image: imgUrl, title: name, type: 2, cta: "⭐⭐⭐⭐⭐" }} full />

          </Block>

          <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
            <CustomSlider data={data}/>

          </Block>
          <Block row space="evenly"
            style={{ flex: 1, flexDirection: 'row' }}
          >
            <Block flex right style={{ marginTop: 8, }}>
              <Text
                style={{ marginRight: 40, marginBottom: theme.SIZES.BASE / 2 }}
                color={argonTheme.COLORS.DEFAULT}
              >
                Pessoas
              </Text>

              <Select
                style={{ paddingTop: 14, paddingBottom: 14, backgroundColor: argonTheme.COLORS.ICON }}
                defaultIndex={1}
                options={["01", "02", "03", "04", "05", "06"]}
                onValueChange={console.log(5)}

              >
              </Select>
            </Block>

            <Block style={{ paddingHorizontal: theme.SIZES.BASE, marginTop: 27 }}>
              <Input
                placeholder="DD MM HH:MM"
                iconContent={
                  <Icon
                    size={11}
                    style={{ marginRight: 10 }}
                    color={argonTheme.COLORS.ICON}
                    name="calendar-date"
                    family="ArgonExtra"
                  />
                }
              />
            </Block>


          </Block>
          <Block center>
            <Button color="default" style={styles.button} onPress={() => { alert("Agendamento concluído") }}>
              Concluir Agendamento
            </Button>
          </Block>

        </Block>
        <Block flex style={styles.group}>
          <Text bold size={16} style={styles.title}>
            Social
          </Text>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Block row center space="between">
              <Block flex middle right>
                <GaButton
                  round
                  onlyIcon
                  shadowless
                  icon="facebook"
                  iconFamily="Font-Awesome"
                  iconColor={theme.COLORS.WHITE}
                  iconSize={theme.SIZES.BASE * 1.625}
                  color={theme.COLORS.FACEBOOK}
                  style={[styles.social, styles.shadow]}
                />
              </Block>
              <Block flex middle center>
                <GaButton
                  round
                  onlyIcon
                  shadowless
                  icon="twitter"
                  iconFamily="Font-Awesome"
                  iconColor={theme.COLORS.WHITE}
                  iconSize={theme.SIZES.BASE * 1.625}
                  color={theme.COLORS.TWITTER}
                  style={[styles.social, styles.shadow]}
                />
              </Block>
              <Block flex middle left>
                <GaButton
                  round
                  onlyIcon
                  shadowless
                  icon="dribbble"
                  iconFamily="Font-Awesome"
                  iconColor={theme.COLORS.WHITE}
                  iconSize={theme.SIZES.BASE * 1.625}
                  color={theme.COLORS.DRIBBBLE}
                  style={[styles.social, styles.shadow]}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: argonTheme.COLORS.HEADER
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },
  inputDefault: {
    borderBottomColor: argonTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: argonTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: argonTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: argonTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: argonTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: argonTheme.COLORS.ERROR
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: "center"
  },
});
/* 
const ModalComponent = () => {
  const modalVisible = false;
  function setModalVisible(valor) {
    modalVisible = valor;
  }
  return (
    
    <View style={stylesModal.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Text style={stylesModal.modalText}>Hello World!</Text>
            <Pressable
              style={[stylesModal.button, stylesModal.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={stylesModal.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Button color="default" style={styles.button} onPress={setModalVisible(!modalVisible)}>
        CONCLUIR AGENDAMENTO
      </Button>

    </View>
  );
};

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
*/