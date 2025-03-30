import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, ScrollView, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { ListProduct } from '@/components/listProduct/ListProduct';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import styles from '../../assets/styles/accueil.styles';

interface Acceuil {
  setPage?: (page: string) => void;
}

export default function Accueil({ setPage }: Acceuil) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filterOptions = ['Tous', 'Nintendo', 'PlayStation', 'Xbox', 'PC'];

  return (
    <ThemedView style={styles.container}>
      {/* Header with logo and profile */}
      <View style={styles.header}>
        <ThemedText style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          GameCorner
        </ThemedText>
        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.pageTitle}>
          Bienvenue sur Game Corner
        </ThemedText>
        
        <ThemedText style={styles.subTitle}>
          Trouvez des jeux vidéo d'occasion à petits prix
        </ThemedText>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#777777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un jeu..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999999"
          />
        </View>

        {/* Filter chips */}
        <View style={styles.filterContainer}>
          {filterOptions.map((filter) => (
            <TouchableOpacity 
              key={filter}
              style={[
                styles.filterChip,
                activeFilter === filter ? styles.filterChipActive : null
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <ThemedText style={[
                styles.filterChipText,
                activeFilter === filter ? styles.filterChipTextActive : null
              ]}>
                {filter}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Separator */}
        <View style={styles.separator} />
        
        {/* Featured products with section header */}
        <ThemedText style={styles.sectionHeader}>Produits en vedette</ThemedText>
        <ListProduct 
          horizontal={true} 
          title="" 
        />
        
        {/* New arrivals */}
        <ThemedText style={styles.sectionHeader}>Nouveaux arrivages</ThemedText>

        <ListProduct 
          horizontal={true} 
          title="" 
        />
        
        {/* Special offers */}
        <ThemedText style={styles.sectionHeader}>Offres spéciales</ThemedText>
        <ListProduct
          horizontal={true} 
          title="" 
        />

        {/* Grid display example */}
        <ThemedText style={styles.sectionHeader}>Parcourir par catégorie</ThemedText>
        <View style={styles.gridContainer}>
          {/* This is just a placeholder - you would normally map through your data */}
          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.gridImageContainer}>
              <Image
                source={{ uri: 'https://m.media-amazon.com/images/I/81KGsbq8ekL._AC_SL1500_.jpg' }}
                style={styles.gridImage}
              />
            </View>
            <View style={styles.gridInfo}>
              <ThemedText style={styles.gridTitle}>Nintendo Switch</ThemedText>
              <ThemedText style={styles.gridPrice}>12 jeux</ThemedText>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.gridItem}>
            <View style={styles.gridImageContainer}>
              <Image
                source={{ uri: 'https://m.media-amazon.com/images/I/61OQP3X038L._AC_SL1500_.jpg' }}
                style={styles.gridImage}
              />
            </View>
            <View style={styles.gridInfo}>
              <ThemedText style={styles.gridTitle}>PlayStation 5</ThemedText>
              <ThemedText style={styles.gridPrice}>18 jeux</ThemedText>
            </View>
          </TouchableOpacity>
        </View>

        {/* Call-to-action button */}
        <View style={{ alignItems: 'center', marginVertical: 30 }}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => setPage && setPage('explore')}>
            <ThemedText style={styles.buttonText}>Voir tous les jeux</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>© 2025 GameCorner - Tous droits réservés</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}