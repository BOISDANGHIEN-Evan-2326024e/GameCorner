import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import data from "../assets/json/data.json";

export default function TabTwoScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const produits = data.produits;
    const filteredGames = produits.filter((produit) =>
        produit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onProfilePress = () => {

        console.log('you pressed the profile button');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <SearchBar onSearch={setSearchQuery} />
                <TouchableOpacity onPress={onProfilePress} style={styles.profileImageContainer}>
                    <Image
                        source={{ uri: "https://m.media-amazon.com/images/I/91jvZUxquKL._AC_SL1500_.jpg" }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredGames}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.gameText}>{item.name}</Text>
                        <Text style={styles.gameText}>{item.prix} €</Text>
                        {item.photo.map((image, index) => (
                            <Image
                                key={index}
                                source={{ uri: image }}
                                style={styles.productImage}
                            />
                        ))}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    profileImageContainer: {
        width: 50,
        height: 50,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 25,
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // For Android
    },
    gameText: {
        fontSize: 16,
        color: '#333',
    },
    productImage: {
        width: 100,
        height: 100,
        marginTop: 8,
    },
});
