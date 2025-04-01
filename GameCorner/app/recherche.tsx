import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Platform, Modal, SafeAreaView } from "react-native";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import Header from '@/components/Header/Header';

interface RechercheProps {
    setPage: (page: string) => void;
    produits: any[];
    relations: any[];
    setSelectedProductId?: (id: number) => void;
}

export default function Recherche({ setPage, produits, relations, setSelectedProductId }: RechercheProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [priceFilter, setPriceFilter] = useState<number | null>(null);
    const [consoleFilter, setConsoleFilter] = useState<number | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<number | null>(null);

    // Définition des catégories
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
    };

    const openProduct = (productId: number) => {
        if (setSelectedProductId) {
            setSelectedProductId(productId);  // Met à jour l'ID du produit
        }
        setPage('produit');  // Change la page vers le composant Product
    };

    // Filtrer les produits en fonction des critères
    const filteredGames = produits.filter((produit) => {
        const matchesSearch = produit.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Filtre de prix
        const matchesPrice = priceFilter === null ||
            (priceFilter === 30 && produit.prix < 30) ||
            (priceFilter === 60 && produit.prix >= 30 && produit.prix < 60) ||
            (priceFilter === 100 && produit.prix >= 60);
            
        // Filtre de console - CORRIGÉ
        const matchesConsole = consoleFilter === null || 
            relations.some(r => 
                r.produit_id === produit.id && 
                r.categorie_id === consoleFilter
            );
            
        // Filtre de catégorie - CORRIGÉ
        const matchesCategory = categoryFilter === null || 
            relations.some(r => 
                r.produit_id === produit.id && 
                r.categorie_id === categoryFilter
            );
            
        return matchesSearch && matchesPrice && matchesConsole && matchesCategory;
    });

    // Activer/désactiver le modal principal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    
    // Activer/désactiver le modal des catégories
    const toggleCategoryModal = () => {
        setCategoryModalVisible(!isCategoryModalVisible);
    };
    
    // Réinitialiser tous les filtres
    const resetAllFilters = () => {
        setPriceFilter(null);
        setConsoleFilter(null);
        setCategoryFilter(null);
    };

    return (
        <ThemedView style={styles.container}>
            <Header setPage={setPage} />
            {/* Search and Filter */}
            <View style={styles.searchAndFilterContainer}>
                <View style={{ flex: 1 }}>
                    <SearchBar onSearch={setSearchQuery} />
                </View>
                <TouchableOpacity 
                    style={styles.filterIcon} 
                    onPress={toggleModal}
                    activeOpacity={0.7}
                >
                    <Ionicons name="filter" size={22} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            
            {/* Chips des filtres actifs */}
            {(priceFilter !== null || consoleFilter !== null || categoryFilter !== null) && (
                <View style={styles.activeFiltersContainer}>
                    {priceFilter !== null && (
                        <View style={styles.activeFilterChip}>
                            <ThemedText style={styles.activeFilterText}>
                                {priceFilter === 30 ? "< 30€" : 
                                 priceFilter === 60 ? "30-60€" : 
                                 priceFilter === 100 ? "> 60€" : ""}
                            </ThemedText>
                            <TouchableOpacity onPress={() => setPriceFilter(null)}>
                                <Ionicons name="close-circle" size={18} color="#6A42F4" />
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    {consoleFilter !== null && (
                        <View style={styles.activeFilterChip}>
                            <ThemedText style={styles.activeFilterText}>
                                {Object.entries(consoleCategories).find(([_, val]) => val === consoleFilter)?.[0] || ""}
                            </ThemedText>
                            <TouchableOpacity onPress={() => setConsoleFilter(null)}>
                                <Ionicons name="close-circle" size={18} color="#6A42F4" />
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    {categoryFilter !== null && (
                        <View style={styles.activeFilterChip}>
                            <ThemedText style={styles.activeFilterText}>
                                {typesJeux[categoryFilter as keyof typeof typesJeux] || ""}
                            </ThemedText>
                            <TouchableOpacity onPress={() => setCategoryFilter(null)}>
                                <Ionicons name="close-circle" size={18} color="#6A42F4" />
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    <TouchableOpacity 
                        style={styles.clearAllFiltersButton}
                        onPress={resetAllFilters}
                    >
                        <ThemedText style={styles.clearAllText}>Effacer tout</ThemedText>
                    </TouchableOpacity>
                </View>
            )}
            
            {/* Liste des résultats */}
            {filteredGames.length > 0 ? (
                <FlatList
                    data={filteredGames}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.listItem}
                            onPress={() => {openProduct(item.id)}}
                            
                        >
                            {item.photo && item.photo.length > 0 && (
                                <Image
                                    source={{uri: item.photo[0]}}
                                    style={styles.productImage}
                                />
                            )}
                            <View style={styles.itemContent}>
                                <ThemedText style={styles.gameTitle}>{item.name}</ThemedText>
                                <ThemedText style={styles.gamePrice}>{item.prix} €</ThemedText>
                                <ThemedText style={styles.gameDescription} numberOfLines={2}>
                                    {item.desc}
                                </ThemedText>
                                <ThemedText style={styles.gameState}>
                                    {item.etat} {item.vendu ? '• Vendu' : '• Disponible'}
                                </ThemedText>
                            </View>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            ) : (
                <View style={styles.emptyList}>
                    <Ionicons name="search-outline" size={50} color="#CCCCCC" />
                    <ThemedText style={styles.emptyListText}>
                        Aucun résultat trouvé. Essayez d'autres critères de recherche.
                    </ThemedText>
                </View>
            )}
            
            {/* Modal de filtres principal */}
            <Modal 
                visible={isModalVisible} 
                animationType="fade" 
                transparent={true}
                onRequestClose={toggleModal}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={toggleModal}
                        >
                            <Ionicons name="close-outline" size={24} color="#333333" />
                        </TouchableOpacity>
                        
                        <ThemedText style={styles.modalTitle}>Filtrer les résultats</ThemedText>
                        
                        {/* Section Prix */}
                        <View style={styles.filterSections}>
                            <ThemedText style={styles.filterSectionTitle}>Gamme de prix</ThemedText>
                            <View style={styles.filtersRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.filterButton, 
                                        priceFilter === 30 && styles.selectedFilter
                                    ]}
                                    onPress={() => setPriceFilter(30)}
                                >
                                    <ThemedText style={[
                                        styles.filterText,
                                        priceFilter === 30 && styles.selectedFilterText
                                    ]}>
                                        Moins de 30€
                                    </ThemedText>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.filterButton, 
                                        priceFilter === 60 && styles.selectedFilter
                                    ]}
                                    onPress={() => setPriceFilter(60)}
                                >
                                    <ThemedText style={[
                                        styles.filterText,
                                        priceFilter === 60 && styles.selectedFilterText
                                    ]}>
                                        30€ - 60€
                                    </ThemedText>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        styles.filterButton, 
                                        priceFilter === 100 && styles.selectedFilter
                                    ]}
                                    onPress={() => setPriceFilter(100)}
                                >
                                    <ThemedText style={[
                                        styles.filterText,
                                        priceFilter === 100 && styles.selectedFilterText
                                    ]}>
                                        Plus de 60€
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        {/* Section Console */}
                        <View style={styles.filterSections}>
                            <ThemedText style={styles.filterSectionTitle}>Console</ThemedText>
                            <View style={styles.filtersRow}>
                                {Object.entries(consoleCategories).map(([name, id]) => (
                                    <TouchableOpacity
                                        key={id}
                                        style={[
                                            styles.filterButton, 
                                            consoleFilter === id && styles.selectedFilter
                                        ]}
                                        onPress={() => setConsoleFilter(id)}
                                    >
                                        <ThemedText style={[
                                            styles.filterText,
                                            consoleFilter === id && styles.selectedFilterText
                                        ]}>
                                            {name}
                                        </ThemedText>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        
                        {/* Section Catégorie */}
                        <View style={styles.filterSections}>
                            <ThemedText style={styles.filterSectionTitle}>Type de jeu</ThemedText>
                            <TouchableOpacity 
                                style={styles.categoryButton}
                                onPress={toggleCategoryModal}
                            >
                                <ThemedText style={styles.categoryButtonText}>
                                    {categoryFilter ? typesJeux[categoryFilter as keyof typeof typesJeux] : "Sélectionner un type"}
                                </ThemedText>
                                <Ionicons name="chevron-down" size={18} color="#6A42F4" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.actionButtonsRow}>
                            <TouchableOpacity
                                style={styles.resetButton}
                                onPress={resetAllFilters}
                            >
                                <ThemedText style={styles.resetButtonText}>Réinitialiser</ThemedText>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={toggleModal}
                            >
                                <ThemedText style={styles.applyButtonText}>Appliquer</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
            
            {/* Modal de catégories */}
            <Modal
                visible={isCategoryModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleCategoryModal}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={[styles.modalContent, styles.categoryModalContent]}>
                        <TouchableOpacity 
                            style={styles.closeButton} 
                            onPress={toggleCategoryModal}
                        >
                            <Ionicons name="close-outline" size={24} color="#333333" />
                        </TouchableOpacity>
                        
                        <ThemedText style={styles.modalTitle}>Type de jeu</ThemedText>
                        
                        <FlatList
                            data={Object.entries(typesJeux)}
                            keyExtractor={([id]) => id}
                            renderItem={({item: [id, name]}) => (
                                <TouchableOpacity 
                                    style={[
                                        styles.categoryItem,
                                        categoryFilter === parseInt(id) && styles.selectedCategoryItem
                                    ]}
                                    onPress={() => {
                                        setCategoryFilter(parseInt(id));
                                        toggleCategoryModal();
                                    }}
                                >
                                    <ThemedText style={[
                                        styles.categoryItemText,
                                        categoryFilter === parseInt(id) && styles.selectedCategoryItemText
                                    ]}>
                                        {name}
                                    </ThemedText>
                                </TouchableOpacity>
                            )}
                            style={styles.categoryList}
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#6A42F4',
        marginBottom: 16,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileIcon: {
        padding: 4,
    },
    searchAndFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    filterIcon: {
        marginLeft: 8,
        padding: 8,
        backgroundColor: '#6A42F4',
        borderRadius: 20,
        width: 38,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeFiltersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        marginBottom: 10,
        alignItems: 'center',
    },
    activeFilterChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECE9FF',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight: 8,
        marginBottom: 8,
    },
    activeFilterText: {
        color: '#6A42F4',
        fontSize: 12,
        marginRight: 4,
    },
    clearAllFiltersButton: {
        marginLeft: 4,
    },
    clearAllText: {
        color: '#6A42F4',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    listItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    itemContent: {
        padding: 12,
    },
    gameTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    gamePrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF4757',
        marginBottom: 8,
    },
    gameDescription: {
        fontSize: 14,
        color: '#777777',
        marginBottom: 8,
    },
    gameState: {
        fontSize: 14,
        color: '#6A42F4',
        fontWeight: '500',
    },
    productImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        width: '80%',
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    categoryModalContent: {
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333333',
        textAlign: 'center',
    },
    filterSections: {
        width: '100%',
        marginBottom: 16,
    },
    filterSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333333',
    },
    filtersRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#F0F0F0',
    },
    selectedFilter: {
        backgroundColor: '#6A42F4',
        borderColor: '#6A42F4',
    },
    filterText: {
        fontSize: 14,
        color: '#333333',
    },
    selectedFilterText: {
        color: '#FFFFFF',
    },
    categoryButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#F8F8F8',
        width: '100%',
    },
    categoryButtonText: {
        fontSize: 14,
        color: '#333333',
    },
    categoryList: {
        width: '100%',
        maxHeight: 300,
    },
    categoryItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    selectedCategoryItem: {
        backgroundColor: '#ECE9FF',
    },
    categoryItemText: {
        fontSize: 16,
        color: '#333333',
    },
    selectedCategoryItemText: {
        color: '#6A42F4',
        fontWeight: '600',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 8,
    },
    resetButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    resetButtonText: {
        color: '#333333',
        fontWeight: '500',
    },
    applyButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#6A42F4',
        alignItems: 'center',
        flex: 1,
        marginLeft: 8,
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    closeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 4,
        zIndex: 1,
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyListText: {
        fontSize: 16,
        color: '#777777',
        textAlign: 'center',
        marginTop: 16,
        paddingHorizontal: 24,
    },
});