import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { 
  Platform, 
  ScrollView, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  Dimensions
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { ListProduct } from '@/components/listProduct/ListProduct';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Header from '@/components/Header/Header';
import styles from '../../assets/styles/accueil.styles';
type Acceuil = {
  setPage: (page: string) => void;
};

export default function Accueil({ setPage }: Acceuil) {
  const windowWidth = Dimensions.get('window').width;
  
  return (
    <ThemedView style={styles.container}>
      {/* En-tête avec logo et icône de profil */}
      <Header setPage={setPage} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Bannière principale avec CTA */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f' }}
          style={styles.banner}
          imageStyle={{ opacity: 0.7 }}
        >
          <View style={styles.bannerOverlay}>
            <ThemedText style={styles.bannerTitle}>
              Achète et vends tes jeux
            </ThemedText>
            <TouchableOpacity 
              style={styles.bannerButton}
              onPress={() => setPage && setPage("recherche")}
            >
              <ThemedText style={styles.bannerButtonText}>Découvrir</ThemedText>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        {/* Barre de raccourcis */}
        <View style={styles.shortcutsContainer}>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => setPage && setPage("recherche")}>
            <View style={styles.shortcutIconContainer}>
              <Feather name="search" size={24} color="#6A42F4" />
            </View>
            <ThemedText style={styles.shortcutText}>Rechercher</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shortcutItem} onPress={() => setPage && setPage("user")}>
            <View style={styles.shortcutIconContainer}>
              <MaterialCommunityIcons name="controller-classic" size={24} color="#6A42F4" />
            </View>
            <ThemedText style={styles.shortcutText}>Vendre</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shortcutItem} onPress={() => {}}>
            <View style={styles.shortcutIconContainer}>
              <FontAwesome5 name="bookmark" size={24} color="#6A42F4" />
            </View>
            <ThemedText style={styles.shortcutText}>Favoris</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shortcutItem} onPress={() => setPage && setPage("user")}>
            <View style={styles.shortcutIconContainer}>
              <Ionicons name="notifications-outline" size={24} color="#6A42F4" />
            </View>
            <ThemedText style={styles.shortcutText}>Alertes</ThemedText>
          </TouchableOpacity>
        </View>
        {/* Produits en vedette */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>En ce moment</ThemedText>
            <TouchableOpacity onPress={() => setPage && setPage("recherche")}>
              <ThemedText style={styles.seeAllText}>Voir tout</ThemedText>
            </TouchableOpacity>
          </View>
          <ListProduct horizontal={true} title="" setPage={setPage} />
        </View>
        
        {/* Produits récemment ajoutés */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Nouveautés</ThemedText>
            <TouchableOpacity onPress={() => setPage && setPage("recherche")}>
              <ThemedText style={styles.seeAllText}>Voir tout</ThemedText>
            </TouchableOpacity>
          </View>
          <ListProduct horizontal={true} title="" setPage={setPage} />
        </View>
        
        {/* Bannière promo */}
        <TouchableOpacity style={styles.promoBanner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420' }} 
            style={styles.promoImage}
          />
          <View style={styles.promoOverlay}>
            <ThemedText style={styles.promoTitle}>Offre de lancement</ThemedText>
            <ThemedText style={styles.promoDescription}>Pas de commission sur ta première vente !</ThemedText>
            <View style={styles.promoButton}>
              <ThemedText style={styles.promoButtonText}>En savoir plus</ThemedText>
            </View>
          </View>
        </TouchableOpacity>

        {/* Pied de page */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>© 2025 GameCorner - Tous droits réservés</ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}