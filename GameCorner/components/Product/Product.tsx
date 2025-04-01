import React, { useEffect, useState } from 'react';
import { Modal, View, Button, Image, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { StyleSheet } from "react-native";

interface RechercheProps {
    productId: number;
    setPage: (page: string) => void;
    produits: any[];
    categories: any[];
    users: any[];
}

export default function Product({ productId, setPage, produits, categories, users }: RechercheProps) {
    console.log("ProductId", productId);
    console.log( "Produits",produits);
    const product = produits.find((prod: { id: number; }) => prod.id === productId);
    const marchandUser = users.find((user: { id: number; }) => user.id === product?.marchand);

    console.log(product);

    if (!product) {
        return (
            <ThemedView>
                <ThemedText>Produit non trouvé</ThemedText>
            </ThemedView>
        );
    }

    const [isSold, setIsSold] = useState(product.vendu);
    const [isModalVisible, setModalVisible] = useState(false);
    const [otherProducts, setOtherProducts] = useState(produits.filter(p => p.marchand === product.marchand));
    const [cart, setCart] = useState<any[]>([]); // Liste des produits dans le panier

    const vendProduit = () => {
        setIsSold(true); // Marquer le produit comme vendu
    };

    const openBuyModal = () => {
        setModalVisible(true);
    };

    const closeBuyModal = () => {
        setModalVisible(false);
    };

    const handleBuy = (item: any) => {
        setCart((prevCart) => [...prevCart, item]); // Ajouter le produit au panier
        setIsSold(true); // Simule un achat
        setModalVisible(false);  // Ferme la modal
    };

    // Calcul de la réduction en fonction du nombre de jeux achetés
    const getDiscount = () => {
        const numItems = cart.length;
        if (numItems === 2) {
            return { discount: 10, color: 'green' };
        } else if (numItems === 3) {
            return { discount: 20, color: 'blue' };
        }
        return { discount: 0, color: '' };
    };

    const { discount, color } = getDiscount();

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ScrollView horizontal>
                    {product.photo.map((imageUrl: any, index: React.Key | null | undefined) => (
                        <Image
                            key={index}
                            source={{ uri: imageUrl }}
                            style={{ width: 400, height: 400, marginRight: 10 }}
                        />
                    ))}
                </ScrollView>
            }>
            <ThemedView style={styles.header}>
                <ThemedText type="title">{product.name}</ThemedText>
                <ThemedText type="title">{product.prix} €</ThemedText>
            </ThemedView>

            <Collapsible title="Description">
                <ThemedText>{product.desc}</ThemedText>
            </Collapsible>

            <Collapsible title="État">
                <ThemedText>{product.etat}</ThemedText>
            </Collapsible>

            <Collapsible title="Marque">
                <ThemedText>Nintendo (pour The Legend of Zelda)</ThemedText>
            </Collapsible>

            <Collapsible title="Nombres de membres intéressés">
                <ThemedText>5 membres sont intéressés par votre article</ThemedText>
            </Collapsible>

            <ThemedText>
                Vendu par : {marchandUser ? `${marchandUser.prenom} ${marchandUser.nom}` : "Utilisateur non trouvé"}
            </ThemedText>

            {discount > 0 && (
                <ThemedText style={{ color: color }}>
                    Vous avez {discount}% de réduction pour l'achat de {cart.length} jeu{cart.length > 1 ? 'x' : ''}.
                </ThemedText>
            )}

            <Button
                title={isSold ? "Vendu" : "Acheter"}
                disabled={isSold} // Désactive le bouton si le produit est vendu
                onPress={openBuyModal}  // Ouvre la modal lors du clic
            />

            {/* Modal Acheter */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeBuyModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Informations du vendeur</Text>
                        <Text style={styles.modalText}>Vendeur: {marchandUser ? `${marchandUser.prenom} ${marchandUser.nom}` : "Utilisateur non trouvé"}</Text>
                        <Text style={styles.modalText}>Contact: {marchandUser ? marchandUser.email : "Non disponible"}</Text>

                        <Text style={styles.modalTitle}>Autres jeux du vendeur</Text>
                        <FlatList
                            data={otherProducts}
                            keyExtractor={(prod) => prod.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.productItem}>
                                    <Image
                                        source={{ uri: item.photo[0] }}
                                        style={styles.productImage}
                                    />
                                    <Text>{item.name}</Text>
                                    <Text>{item.prix} €</Text>
                                    <Button
                                        title={`Acheter ${item.name}`}
                                        onPress={() => handleBuy(item)}  // Ajouter le produit au panier
                                    />
                                </View>
                            )}
                        />

                        <Button
                            title={`Acheter pour ${product.prix} €`}
                            onPress={() => handleBuy(product)}  // Simule l'achat et ferme la modal
                        />

                        <Button
                            title="Fermer"
                            onPress={closeBuyModal}  // Ferme la modal
                        />
                    </View>
                </View>
            </Modal>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    header: {
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
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
    modalText: {
        fontSize: 16,
        marginVertical: 5,
    },
    productItem: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
});
