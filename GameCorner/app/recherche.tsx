import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Modal } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface RechercheProps {
    setPage: (page: string) => void;
    produits: any[];
    relations: any[];
}

export default function Recherche({ setPage, produits, relations }: RechercheProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const [consoleFilter, setConsoleFilter] = useState<number | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

    const consoleCategories = {
        Xbox: 13,
        PlayStation: 14,
        Nintendo: 15
    };

    const typesJeux = {
        1: "Action",
        2: "Aventure",
        3: "RPG",
        4: "Course",
        5: "Sport",
        6: "FPS",
        7: "Simulation",
        8: "Stratégie",
        9: "Horreur",
        10: "Puzzle",
        11: "Multijoueur",
        12: "Indépendant"
    };

    const filteredGames = produits.filter((produit) => {
        const matchesSearch = produit.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = priceFilter === null ||
            (priceFilter === 30 && produit.prix < 30) ||
            (priceFilter === 60 && produit.prix >= 30 && produit.prix < 60) ||
            (priceFilter === 100 && produit.prix >= 60);
        const matchesConsole = consoleFilter === null ||
            relations.some(rel => rel.produit_id === produit.id && rel.categorie_id === consoleFilter);
        const matchesCategory = categoryFilter === null ||
            relations.some(rel => rel.produit_id === produit.id && rel.categorie_id === categoryFilter);

        return matchesSearch && matchesPrice && matchesConsole && matchesCategory;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.headerText}>GameCorner</ThemedText>
                <TouchableOpacity onPress={() => setPage("user")}>
                    <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <SearchBar onSearch={setSearchQuery} />
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.filterIcon}>
                    <Ionicons name="filter" size={28} color="#6A42F4" />
                </TouchableOpacity>
            </View>

            {/* Boutons pour filtrer par console */}
            <View style={styles.filterButtonsContainer}>
                <TouchableOpacity
                    style={[styles.consoleButton, consoleFilter === consoleCategories.Xbox && styles.selectedFilter]}
                    onPress={() => setConsoleFilter(consoleFilter === consoleCategories.Xbox ? null : consoleCategories.Xbox)}
                >
                    <Text style={styles.filterText}>Xbox</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.consoleButton, consoleFilter === consoleCategories.PlayStation && styles.selectedFilter]}
                    onPress={() => setConsoleFilter(consoleFilter === consoleCategories.PlayStation ? null : consoleCategories.PlayStation)}
                >
                    <Text style={styles.filterText}>PlayStation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.consoleButton, consoleFilter === consoleCategories.Nintendo && styles.selectedFilter]}
                    onPress={() => setConsoleFilter(consoleFilter === consoleCategories.Nintendo ? null : consoleCategories.Nintendo)}
                >
                    <Text style={styles.filterText}>Nintendo</Text>
                </TouchableOpacity>
            </View>

            {/* Bouton de tri par catégories */}
            <View style={styles.filterButtonsContainer}>
                <TouchableOpacity style={styles.categoryButton} onPress={() => setCategoryModalVisible(true)}>
                    <Text style={styles.filterText}>Trier par catégories</Text>
                </TouchableOpacity>
            </View>

            {/* Liste des jeux filtrés */}
            <FlatList
                data={filteredGames}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.gameText}>{item.name}</Text>
                        <Text style={styles.gameText}>{item.prix} €</Text>
                        {item.photo.map((image, index) => (
                            <Image key={index} source={{ uri: image }} style={styles.productImage} />
                        ))}
                    </View>
                )}
            />

            {/* Modal pour filtrage par catégorie */}
            <Modal visible={isCategoryModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filtrer par catégorie</Text>
                        {Object.entries(typesJeux).map(([id, name]) => (
                            <TouchableOpacity
                                key={id}
                                style={[styles.filterButton, categoryFilter === Number(id) && styles.selectedFilter]}
                                onPress={() => setCategoryFilter(categoryFilter === Number(id) ? null : Number(id))}
                            >
                                <Text style={styles.filterText}>{name}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setCategoryModalVisible(false)}
                        >
                            <Text style={styles.filterText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal pour filtrage par prix */}
            <Modal visible={isModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Filtrer par prix</Text>
                        <TouchableOpacity
                            style={[styles.filterButton, priceFilter === 30 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(30)}
                        >
                            <Text style={styles.filterText}>Moins de 30€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, priceFilter === 60 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(60)}
                        >
                            <Text style={styles.filterText}>30€ - 60€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, priceFilter === 100 && styles.selectedFilter]}
                            onPress={() => setPriceFilter(100)}
                        >
                            <Text style={styles.filterText}>Plus de 60€</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.filterText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#6A42F4',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    filterIcon: {
        marginLeft: 10,
    },
    filterButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    consoleButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    categoryButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#6A42F4',
        alignItems: 'center',
        marginVertical: 5,
    },
    selectedFilter: {
        backgroundColor: '#2E8B57',
    },
    closeButton: {
        backgroundColor: '#D32F2F',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});