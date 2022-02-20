import React, {useState, useEffect} from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  FlatList
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem } from '../components';
import { auth, getUserInfo } from "../firebase/Database";

function CustomDrawerContent({ drawerPosition, navigation, perfil, focused, state, ...rest }) {
  const screens = [
    "Home", 
    "Perfil",
    "Notificacoes",
    "Logout"
  ];

  const [DATA, setData] = useState(null);

  const getElements = async () => {
    try {
      const info = await getUserInfo();
      setData(info);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    getElements();
  }, []);


  return (
    <Block
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <Block flex={0.06} style={styles.header}>
        <Image styles={styles.logo} source={Images.Logo} />
        {(<FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Text>
                {item.name}
              </Text>
            )}
          />
          )}
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
              return (
                <DrawerCustomItem
                  title={item}
                  key={index}
                  navigation={navigation}
                  focused={state.index === index ? true : false}
                />
              );
            })}
        </ScrollView>
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: 'center'
  }
});

export default CustomDrawerContent;
