import React, { useState, shouldComponentUpdate } from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, Modal, Pressable, View } from "react-native";
// Galio components
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants";
import { Button, Select, Icon, Input, Header, Switch, Card, ModalComponent } from "../components";

import articles from '../constants/articles';

const { width } = Dimensions.get("screen");



class Schedule extends React.Component {

  state = {
    price: 0,
    /*
    "switch-1": true,
    "switch-2": false
     */
  };

  updatePrice = (price) => {
    this.setState({ price: price })
  }



  toggleSwitch = switchId =>
    this.setState({ [switchId]: !this.state[switchId] });

  renderButtons = () => {

    const { navigation } = this.props;
    //const meuItem = route.params;
    //console.log(meuItem)
    return (
      <Block flex>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Card item={articles[1]} full />

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
        <Text
          style={{ marginLeft: 40, marginBottom: theme.SIZES.BASE / 2 }}
          color={argonTheme.COLORS.DEFAULT}
        >
          Price: {this.state.price}
        </Text>
        <Block center>
          <Button color="default" style={styles.button} onPress={() => { alert("Agendamento concluído") }}>
            Concluir Agendamento
          </Button>
        </Block>

      </Block>

    );
  };

  renderText = () => {
    return (
      <Block flex style={styles.group}>
        {/*
        <Text bold size={16} style={styles.title}>
          Typography
        </Text>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text
            h1
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 1
          </Text>
          <Text
            h2
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 2
          </Text>
          <Text
            h3
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 3
          </Text>
          <Text
            h4
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 4
          </Text>
          <Text
            h5
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Heading 5
          </Text>
          <Text
            p
            style={{ marginBottom: theme.SIZES.BASE / 2 }}
            color={argonTheme.COLORS.DEFAULT}
          >
            Paragraph
          </Text>
          <Text muted>This is a muted paragraph.</Text>
        </Block>
                 */
        }
      </Block>
    );
  };

  renderInputs = () => {
    return;
  };

  renderSwitches = () => {
    return (
      <Block flex style={styles.group}>
        <Text bold size={16} style={styles.title}>
          Switches
        </Text>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block
            row
            middle
            space="between"
            style={{ marginBottom: theme.SIZES.BASE }}
          >
            <Text size={14}>Switch is ON</Text>
            <Switch
              value={this.state["switch-1"]}
              onValueChange={() => this.toggleSwitch("switch-1")}
            />
          </Block>
          <Block row middle space="between">
            <Text size={14}>Switch is OFF</Text>
            <Switch
              value={this.state["switch-2"]}
              onValueChange={() => this.toggleSwitch("switch-2")}
            />
          </Block>
        </Block>
      </Block>
    );
  };

  renderTableCell = () => {
    const { routes, navigation } = this.props;
    return;
  };

  renderSocial = () => {
    return (
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
    );
  };

  renderNavigation = () => {
    return;
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30, width }}>
          {this.renderButtons()}
          {this.renderText()}
          {this.renderInputs()}
          {this.renderSocial()}
          {/*this.renderSwitches()*/}
          {this.renderNavigation()}
          {this.renderTableCell()}
        </ScrollView>
      </Block>
    );
  }
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

export default Schedule;