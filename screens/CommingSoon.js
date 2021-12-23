import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";

export default class CommingSoon extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.CommingSoon}
            style={styles.bg}
          />
          
          <Block space="between" style={styles.padded}>
            <Block  shado>
              <Text size={16} color='rgba(255,255,255,0.6)' style={styles.txtInfo}>
                Ainda em construção. Este elemento estará disponível brevemente.
              </Text>
            </Block>
            <Block>
              <Button
                shadowless
                style={styles.button}
                color={argonTheme.COLORS.BLACK}
                onPress={() => navigation.navigate('Home')}
                /*onPress={() => Linking.openURL('https://www.creative-tim.com/product/argon-pro-react-native').catch((err) => console.error('An error occurred', err))}*/>
                <Text bold color={theme.COLORS.WHITE}>Voltar</Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    marginTop: '-200%',
    marginLeft: '-10%',
    transform: [{ rotate: '-38deg' }],
    shadowRadius: 0,
    shadowOpacity: 0,
  }, bg: {
    flex: 1,
    height: '100%',
    width,
    zIndex: 1
  }, txtInfo: {
    marginBottom: '10%'
  }
});
