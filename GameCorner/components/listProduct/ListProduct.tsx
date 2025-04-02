import React, { useState } from 'react';
import { ScrollView, View, Image, Pressable, Modal, TouchableOpacity, Text } from 'react-native';
import { styles } from './ListProduct.styles';
import { ThemedText } from '@/components/ThemedText';
import Product from "@/components/Product/Product";

// Type pour un produit
type Product = {
    id: number;
    name: string;
    prix: number;
    desc: string;
    photo: string[];
    etat: string;
    vendu: boolean;
};

// Modification du type ListProductProps pour inclure les users
type ListProductProps = {
    horizontal?: boolean;
    title?: string;
    setPage: (page: string) => void;
    setSelectedProductId: (productId: number) => void;
    users?: any[] | null; // Liste des utilisateurs
    products: any[]; // Liste des produits
  };
  
  export function ListProduct({ 
    horizontal = true, 
    title = "Produits populaires", 
    setPage, 
    setSelectedProductId,
    users,
                                  products
  }: ListProductProps) {
  
    // Fonction pour trouver le nom du vendeur
    const getSellerName = (marchandId: number) => {
      // @ts-ignore
        const seller = users.find(user => user.id === marchandId);
      return seller ? `${seller.prenom} ${seller.nom}` : "Vendeur inconnu";
    };
  
    const openProduct = (productId: number) => {
      setSelectedProductId(productId);
      setPage('produit');
    };
  
    return (
      <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>{title}</ThemedText>
        
        <ScrollView
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {products.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => openProduct(product.id)}
            >
              <Image
                source={{ uri: product.photo[0] }}
                style={styles.productImage}
                resizeMode="cover"
              />
              {product.vendu && (
                <View style={styles.soldBadge}>
                  <ThemedText style={styles.soldText}>Vendu</ThemedText>
                </View>
              )}
              <View style={styles.productInfo}>
                <ThemedText style={styles.productName} numberOfLines={1}>{product.name}</ThemedText>
                
                {/* Nouveau: État du produit */}
                <ThemedText style={styles.productState} numberOfLines={1}>{product.etat}</ThemedText>
                
                {/* Nouveau: Nom du vendeur */}
                <ThemedText style={styles.productSeller} numberOfLines={1}>
                  {getSellerName(product.marchand)}
                </ThemedText>
                
                {/* Prix en rouge */}
                <ThemedText style={styles.productPrice}>{product.prix} €</ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }