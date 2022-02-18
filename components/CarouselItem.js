import React from 'react';
import { ParallaxImage } from 'react-native-snap-carousel';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
import { Block } from 'galio-framework';

function CarouselItem({ item, index }, parallaxProps) {
    return (
        <Block>
            
            <Pressable onPress={() => alert('Image description:' + item.description)}>
                <SafeAreaView style={styles.item}>
                    <ParallaxImage
                        source={{ uri: item}} /* the source of the image */
                        containerStyle={styles.imageContainer}
                        style={styles.image}
                        {...parallaxProps} /* pass in the necessary props */
                    />
                    <Text style={styles.title} numberOfLines={2}>
                        {item.title}
                    </Text>
                </SafeAreaView>
            </Pressable>
        </Block>
    );
}

export default CarouselItem;