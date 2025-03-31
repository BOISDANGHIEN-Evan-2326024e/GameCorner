import React, { useState } from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Platform, Modal} from "react-native";
import { SearchBar } from "@/components/SearchBar";
import data from "../assets/json/data.json";
import {ThemedText} from "@/components/ThemedText";
import {Ionicons} from "@expo/vector-icons";

interface RechercheProps {
    setPage: (page: string) => void;
}

export default function Recherche({ setPage }: RechercheProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);

    const produits = data.produits;

    const filteredGames = produits.filter((produit) => {
        const matchesSearch = produit.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = priceFilter === null ||
            (priceFilter === 30 && produit.prix < 30) ||
            (priceFilter === 60 && produit.prix >= 30 && produit.prix < 60) ||
            (priceFilter === 100 && produit.prix >= 60);
        return matchesSearch && matchesPrice;
    });

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <View style={styles.header}>
                <ThemedText style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
                    GameCorner
                </ThemedText>
                <TouchableOpacity onPress={() => setPage && setPage("user")}>
                    <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <SearchBar onSearch={setSearchQuery}/>
                    <TouchableOpacity onPress={toggleModal}>
                        <Ionicons name="filter" size={28} color="#FFFFFF"/>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredGames}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.listItem}>
                            <Text style={styles.gameText}>{item.name}</Text>
                            <Text style={styles.gameText}>{item.prix} €</Text>
                            {item.photo.map((image, index) => (
                                <Image
                                    key={index}
                                    source={{uri: image}}
                                    style={styles.productImage}/>
                            ))}
                        </View>
                    )}
                />
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Liste des filtres</Text>
                        <TouchableOpacity
                            style={[styles.filterButton, priceFilter === 30 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(30)}>
                            <Text style={styles.filterText}>Moins de 30€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, { backgroundColor: '#FFA500' }, priceFilter === 60 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(60)}>
                            <Text style={styles.filterText}>30€ - 60€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, { backgroundColor: '#FF4757' }, priceFilter === 100 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(100)}>
                            <Text style={styles.filterText}>Plus de 60€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={() => setPriceFilter(null)}>
                            <Text style={styles.filterText}>Réinitialiser</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={toggleModal}>
                            <Text style={styles.filterText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
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
        elevation: 2,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#6A42F4',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterButton: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        width: '100%',
    },
    selectedFilter: {
        backgroundColor: '#2E8B57',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#999',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    }
});