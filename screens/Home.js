import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import { getRandom } from '../firebase/Database';
const { width } = Dimensions.get('screen');

export default function Home() {

  const [DATA, setData] = useState(null);
  const [tam, setTam] = useState(0);

  const getElements = async () => {
    try {
      const info = await getRandom();
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
        {(<FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Card item={{
                image: item.imgUrl,
                type: item.type,
                title: (item.type == 2) ? (item.descricao + "\n\n" + item.name + "\n" + item.localizacao) : item.name,
                cta: "Conhecer"}} horizontal />
            )}
          />
          )}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});
