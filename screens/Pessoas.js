import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import { getAllUsers } from '../firebase/Database';

const { width } = Dimensions.get('screen');

export default function Pessoas() {

  const [DATA, setData] = useState(null);

  const getElements = async () => {
    try {
      const info = await getAllUsers();
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
          {
            /*
            <Block flex row>
              <Card item={articles[2]} style={{ marginRight: theme.SIZES.BASE }} />
              <Card item={articles[0]} />
            </Block>
             */
          }

          {(<FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Card item={{ image: item.imgUrl, title: item.name, type: item.type, cta: "Conhecer" }} horizontal />
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
