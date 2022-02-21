import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Block, theme } from 'galio-framework';
import { getRandomItem } from '../firebase/Database';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

//import database from '../firebase/FirebaseConnection';

export default function Aleatorio() {

  const [DATA, setData] = useState(null);

  const getElements = async () => {
    try {
      const info = await getRandomItem();
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
                email: item.email,
                image: item.imgUrl,
                type: item.type,
                title: (item.type == 2) ? (item.descricao + "\n\n" + item.name + "\n" + item.localizacao) : item.name,
                userId: item.userId,
                cta: "Conhecer"}} horizontal />
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
