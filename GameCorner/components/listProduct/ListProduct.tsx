import React, { useState } from 'react';
import { ScrollView, View, Image, Pressable, Modal } from 'react-native';
import data from '../../assets/json/data.json';
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

type ListProductProps = {
    horizontal?: boolean;
    title?: string;
    setPage: (page: string) => void;
    setSelectedProductId: (productId: number) => void;
};

export function ListProduct({ horizontal = true, title = "Produits populaires", setPage, setSelectedProductId }: ListProductProps) {
    const products = data.produits || [];
    const [modalVisible, setModalVisible] = useState(false)

    const openProduct = (productId: number) => {
        setSelectedProductId(productId);  // Met à jour l'ID du produit
        setPage('produit');  // Change la page vers le composant Product
    };


    const closeProduct = () => {
        setModalVisible(false);
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
                    <Pressable
                        key={product.id}
                        style={styles.productCard}
                        onPress={() => {openProduct(product.id)}}
                    >
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
                                    <ThemedText style={styles.soldText} >Vendu</ThemedText>
                                </View>
                            )}
                        </View>
                    </Pressable>
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={closeProduct}
            >
            </Modal>
        </View>
    );
}