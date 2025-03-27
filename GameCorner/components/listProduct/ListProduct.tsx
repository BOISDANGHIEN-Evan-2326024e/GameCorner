import React from 'react';
import { ScrollView, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import data from '../../assets/json/data.json';
import { styles } from './ListProduct.styles';
import { ThemedText } from '@/components/ThemedText';

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

type ListProductProps = {
  horizontal?: boolean;
  title?: string;
};

export function ListProduct({ horizontal = true, title = "Produits populaires" }: ListProductProps) {
  // Utiliser les produits du fichier JSON
    const products = data.produits || [];

    return (
        <View style={styles.container}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>{title}</ThemedText>
        
        <ScrollView
            horizontal={horizontal}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
            {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} asChild>
                <Pressable style={styles.productCard}>
                <Image
                    source={{ uri: product.photo[0] }}
                    style={styles.productImage}


                    resizeMode="cover"
                />
                <View style={styles.productInfo}>
                    <ThemedText style={styles.productName} numberOfLines={1}>{product.name}</ThemedText>
                    <ThemedText style={styles.productPrice}>{product.prix} €</ThemedText>
                    {product.vendu && (
                    <View style={styles.soldBadge}>
                        <ThemedText style={styles.soldText}>Vendu</ThemedText>
                    </View>
                    )}
                </View>
                </Pressable>
            </Link>
            ))}
        </ScrollView>
        </View>
    );
}