import * as React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import firebase from 'firebase/compat';
import { useEffect, useState } from "react";

const ClothesDetails = ({ route, navigation }) => {
    const [Clothes, setClothes] = useState({});

    useEffect(() => {
        const selectedClothing = route.params.Clothes
        selectedClothing[1] == undefined ? setClothes(route.params.Clothes) : setClothes(route.params.Clothes[1]);
        return () => {
            setClothes({})
        }
    });

    if (!Clothes) {
        return <Text>No data</Text>;
    }
    return (
        <View style={styles.container}>
            <Image
                source={{ url: Clothes.imgurl }}
                style={{ width: '97%', height: '50%', alignSelf: "center" }}></Image>
            {
                Object.entries(Clothes).map((item, index) => {
                    // img, imgurl, koordinater og vaskeanvisnigner fjernes, for ikke at vise dem som skrift på siden. 
                    if (item[0] === 'img' || item[0] === 'imgurl' || item[0] === 'longlat' || item[0] === 'Vaskeanvisninger') {
                        delete item[0]
                        delete item[1]
                    }
                    return (
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{item[0]} </Text>
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
            <Pressable style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 32,
                borderRadius: 20,
                elevation: 3,
                backgroundColor: '#fac8b4',
                width: '96%',
                alignSelf: 'center'
            }} onPress={() => console.log('Button pressed')}>
                <Text>
                    Kontakt udlejer
                </Text>
            </Pressable>
        </View>
    );
}

export default ClothesDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 150, fontWeight: 'bold' },
    value: { flex: 1 },
});