import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import { Modal } from 'react-native';
import { Image } from 'react-native';

import { Block, Text as GaButton, theme } from "galio-framework";

import { Button } from "../components";

// Argon themed components
import { argonTheme, tabs } from "../constants"
import { Select, Icon, Input, Header, Switch, ModalComponent } from "../components";

import { Card } from '../components';
import articles from '../constants/articles';
import { getConnections, newInvite } from '../firebase/Database';
import { View } from 'react-native';

const { width } = Dimensions.get('screen');

export default function ListaAConvidar({ navigation, route }) {

    // Quando se refere ao id é id do restaurante
    const { id } = route.params;
    const [DATA, setData] = useState(null);
    const [tam, setTam] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    const getElements = async () => {
        try {
            const info = await getConnections();
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
                        <TouchableOpacity>

                            <Block card={true} borderless={true} style={{ backgroundColor: 'white', padding: 10, paddingTop: 20 }} shadow={true}
                            >
                                <Block flex style={{ borderRadius: 3, elevation: 1, overflow: 'hidden', }}>
                                    <Image source={{ uri: item.imgUrl }} style={{ height: 122 }} />
                                </Block>

                                <Text p style={{ marginBottom: 15, textAlign: 'center' }}>{item.name}</Text>

                                <Block style={styles.info}>
                                    <Block
                                        middle
                                        row
                                        space="evenly"
                                        style={{}}
                                    >
                                        <Button
                                            small
                                            style={{ backgroundColor: argonTheme.COLORS.PRIMARY }}
                                            onPress={() => {
                                                newInvite(id, item.userId);
                                             }}
                                        >
                                            CONVIDAR
                                        </Button>
                                    </Block>

                                </Block>

                            </Block>
                        </TouchableOpacity>
                    )}
                />
                )}
            </ScrollView>
            {
                openModal &&
                <Modal>
                    <Block paddingHorizontal={theme.SIZES.BASE} flex justifyContent={'center'} marginBottom={'40%'}>
                        <Text h1 center> FOTO DE PERFIL</Text>
                        <Text h5 center >Convidou você para o Cantinho do ativo</Text>
                        <Block paddingHorizontal={theme.SIZES.BASE} style={{ marginTop: '10%', paddingVertical: '10%', borderColor: argonTheme.COLORS.BORDER_COLOR, borderWidth: 1 }}>
                            <Text p>Detalhes da reserva</Text>

                            <Text p size={16} style={{ marginTop: '5%' }} color={argonTheme.COLORS.ICON} >Segunda , 10/01/2000 18h20</Text>
                            <Text p size={16} style={{ marginTop: '5%' }} color={argonTheme.COLORS.ICON} >Talatona - 1º Avenida Rua 25 (Ver no mapa)</Text>
                            <Text p size={16} style={{ marginTop: '5%' }} color={argonTheme.COLORS.ICON} >+5 pessoas foram convidadas. (Ver convidados</Text>


                            <Block marginTop={'20%'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} >
                                <Button title="Aceitar Convite" color={argonTheme.COLORS.PRIMARY} onPress={() => setOpenModal(false)}></Button>
                                <Button title="Recusar Convite" color={argonTheme.COLORS.DEFAULT} onPress={() => setOpenModal(false)}></Button>
                            </Block>
                        </Block>


                    </Block>

                </Modal>

            }
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
    iconStyle: {
        fontSize: 40,
        marginTop: 30,
        color: 'black',
    },
    info: {
        paddingHorizontal: 40
    },
});
