import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, ScrollView, View, StyleSheet } from 'react-native';
import { ListProduct } from '@/components/listProduct/ListProduct';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Accueil() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText type="title" style={styles.pageTitle}>
          Bienvenue sur Game Corner
        </ThemedText>
        
        {/* Produits en vedette */}
        <ListProduct 
          horizontal={true} 
          title="Produits en vedette" 
        />
        
        {/* Nouveaux arrivages */}
        <ListProduct 
          horizontal={true} 
          title="Nouveaux arrivages" 
        />
        
        {/* Offres spéciales */}
        <ListProduct 
          horizontal={true} 
          title="Offres spéciales" 
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 24,
  }
});