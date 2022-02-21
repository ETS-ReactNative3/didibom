import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Block, theme } from 'galio-framework';
import { getAllRestaurants } from '../firebase/Database';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

//import database from '../firebase/FirebaseConnection';

export default function Comidas() {

  const [DATA, setData] = useState(null);

  const getElements = async () => {
    try {
      const info = await getAllRestaurants();
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
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>

        <Block flex>
        {(<FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Card item={{
                image: item.imgUrl,
                imagens: item.imagens,
                title: (item.descricao + "\n\n" + item.name + "\n" + item.localizacao),
                cta: "Conhecer",
                type: item.type,
                id: item.id,
              }} horizontal />
            )}
          />
          )}
        </Block>
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    marginTop: '60%',
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
