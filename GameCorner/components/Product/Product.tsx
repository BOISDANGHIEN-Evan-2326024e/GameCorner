import React, { useEffect, useState } from 'react';
import { Modal, View, Button, Image, FlatList, Text, ScrollView, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from './Product.styles';

interface RechercheProps {
    productId: number;
    setPage: (page: string) => void;
    produits: any[];
    setProduits: (produits: any[]) => void;
    categories: any[];
    users: any[];
}

export default function Product({ productId, setPage, produits, setProduits, categories, users }: RechercheProps) {
    const product = produits.find((prod: { id: number; }) => prod.id === productId);
    const marchandUser = users.find((user: { id: number; }) => user.id === product?.marchand);
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();
    const isLargeScreen = windowWidth > 600;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSold, setIsSold] = useState(product?.vendu || false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [otherProducts, setOtherProducts] = useState(
        produits.filter(p => p.marchand === product?.marchand && p.id !== product?.id)
    );
    const [cart, setCart] = useState<any[]>([]); // Liste des produits dans le panier

    if (!product) {
        return (
            <ThemedView style={styles.errorContainer}>
                <ThemedText style={styles.errorText}>Produit non trouvé</ThemedText>
                <TouchableOpacity style={styles.goBackButton} onPress={() => setPage('accueil')}>
                    <ThemedText style={styles.goBackButtonText}>Retourner à l'accueil</ThemedText>
                </TouchableOpacity>
            </ThemedView>
        );
    }

    const openBuyModal = () => {
        setCart((prevCart) => {
            // Vérifier si le produit est déjà dans le panier
            if (!prevCart.some(p => p.id === product.id)) {
                return [...prevCart, product];
            }
            return prevCart;
        });
        setModalVisible(true);
    };

    const closeBuyModal = () => {
        setModalVisible(false);
    };

    const addToCart = (item: any) => {
        setCart((prevCart) => {
            // Vérifier si le produit est déjà dans le panier
            if (!prevCart.some(p => p.id === item.id)) {
                return [...prevCart, item];
            }
            return prevCart;
        });
    };

    const removeFromCart = (itemId: number) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    };

    const handlePurchase = () => {
        if (cart.length === 0) return;

        const purchasedProductIds = cart.map(item => item.id);

        const updatedProduits = produits.map(prod => {
            if (purchasedProductIds.includes(prod.id)) {
                return { ...prod, vendu: true };
            }
            return prod;
        });

        setProduits(updatedProduits);

        if (purchasedProductIds.includes(productId)) {
            setIsSold(true);
        }

        setOtherProducts(prevOtherProducts =>
            prevOtherProducts.map(prod => {
                if (purchasedProductIds.includes(prod.id)) {
                    return { ...prod, vendu: true };
                }
                return prod;
            })
        );

        alert(`Achat réussi ! ${cart.length} produit(s) acheté(s).`);

        setCart([]);
        setModalVisible(false);
        setPage('accueil');
    };

    const getDiscount = () => {
        const numItems = cart.length;
        if (numItems === 2) {
            return { discount: 10, color: 'rgba(40, 167, 69, 1)' };
        } else if (numItems >= 3) {
            return { discount: 20, color: 'rgba(130, 87, 254, 1.00)' };
        }
        return { discount: 0, color: 'black' };
    };

    const { discount, color } = getDiscount();

    // Calcul du montant total avec réduction
    const calculateTotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.prix, 0);
        const discountAmount = subtotal * (discount / 100);
        return {
            subtotal,
            discountAmount,
            total: subtotal - discountAmount
        };
    };

    const { subtotal, discountAmount, total } = calculateTotal();

    const navigateToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const handleBackPress = () => {
        setPage('accueil');
    };

    return (
        <ThemedView style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
            >
                <IconSymbol name="arrow-left" size={24} />
                <ThemedText style={styles.backButtonText}>Retour</ThemedText>
            </TouchableOpacity>
            {/* Image Gallery with Pagination - Responsive */}
            <View style={[styles.imageContainer, { height: windowHeight * 0.4 }]}>
                <Image
                    source={{ uri: product.photo[currentImageIndex] }}
                    style={[styles.mainImage, {
                        width: windowWidth * (isLargeScreen ? 0.7 : 0.85),
                        height: windowWidth * (isLargeScreen ? 0.7 : 0.85) * 0.75
                    }]}
                    resizeMode="cover"
                />

                <View style={styles.pagination}>
                    {product.photo.map((_: any, index: number) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.paginationDot,
                                currentImageIndex === index && styles.paginationDotActive
                            ]}
                            onPress={() => navigateToImage(index)}
                        />
                    ))}
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.thumbnailScroll}
                    contentContainerStyle={styles.thumbnailContainer}
                >
                    {product.photo.map((imageUrl: string, index: number) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigateToImage(index)}
                            style={[
                                styles.thumbnailTouch,
                                currentImageIndex === index && styles.thumbnailActive
                            ]}
                        >
                            <Image
                                source={{ uri: imageUrl }}
                                style={styles.thumbnail}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.contentScroll}>
                <ThemedView style={styles.header}>
                    <ThemedText style={styles.productTitle}>{product.name}</ThemedText>
                    <ThemedText style={styles.productPrice}>{product.prix} €</ThemedText>
                </ThemedView>

                {/* Informations produit en "bulles" */}
                <ThemedView style={styles.infoContainer}>
                    <ThemedView style={styles.infoBubble}>
                        <ThemedText style={styles.infoBubbleText}>État: {product.etat}</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.infoBubble}>
                        <ThemedText style={styles.infoBubbleText}>Marque: Nintendo</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.infoBubble}>
                        <ThemedText style={styles.infoBubbleText}>5 membres intéressés</ThemedText>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={styles.vendorInfo}>
                    <ThemedText style={styles.vendorText}>
                        Vendu par : {marchandUser ? `${marchandUser.prenom} ${marchandUser.nom}` : "Utilisateur non trouvé"}
                    </ThemedText>
                </ThemedView>

                <Collapsible title="Description" style={styles.collapsible}>
                    <ThemedText style={styles.collapsibleContent}>
                        {product.desc}
                    </ThemedText>
                </Collapsible>

                <TouchableOpacity
                    style={[styles.buyButton, isSold && styles.soldButton]}
                    disabled={isSold}
                    onPress={openBuyModal}
                >
                    <ThemedText style={styles.buyButtonText}>{isSold ? "Vendu" : "Acheter"}</ThemedText>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal Acheter avec panier et réductions - Responsive */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={false} // Utilisation d'un fond opaque pour éviter les problèmes d'affichage
                onRequestClose={closeBuyModal} // Permet de fermer le modal avec le bouton retour
            >
                <View style={{ flex: 1, backgroundColor: '#f9f9f9', padding: 10 }}>
                    {/* En-tête avec bouton de fermeture */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6A42F4' }}>
                            Informations d'achat
                        </Text>
                        <TouchableOpacity
                            style={{ padding: 10, backgroundColor: '#dc3545', borderRadius: 8 }}
                            onPress={closeBuyModal}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Fermer</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Contenu principal */}
                    <ScrollView>
                        {/* Infos vendeur */}
                        <View style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#6A42F4' }}>
                                Vendeur
                            </Text>
                            <Text style={{ marginBottom: 5 }}>
                                {marchandUser ? `${marchandUser.prenom} ${marchandUser.nom}` : "Utilisateur non trouvé"}
                            </Text>
                            <Text>
                                Contact: {marchandUser ? marchandUser.email : "Non disponible"}
                            </Text>
                        </View>

                        {/* Autres jeux du vendeur */}
                        <View style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, marginBottom: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#6A42F4' }}>
                                Autres jeux du vendeur
                            </Text>
                            {[product, ...otherProducts].map(item => (
                                <View
                                    key={item.id}
                                    style={{
                                        flexDirection: 'row',
                                        padding: 10,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#e0e0e0',
                                        marginBottom: 8
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.photo[0] }}
                                        style={{ width: 60, height: 60, borderRadius: 5 }}
                                    />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: '#6A42F4', fontWeight: 'bold' }}>
                                            {item.prix} €
                                        </Text>
                                        <TouchableOpacity
                                            style={{
                                                padding: 8,
                                                borderRadius: 5,
                                                backgroundColor: (item.vendu || cart.some(p => p.id === item.id))
                                                    ? '#cccccc'
                                                    : '#28a745',
                                                alignItems: 'center',
                                                marginTop: 5
                                            }}
                                            onPress={() => {
                                                if (!item.vendu && !cart.some(p => p.id === item.id)) {
                                                    addToCart(item);
                                                }
                                            }}
                                            disabled={item.vendu || cart.some(p => p.id === item.id)}
                                        >
                                            <Text style={{ color: 'white', fontSize: 12 }}>
                                                {item.vendu ? "Vendu" : cart.some(p => p.id === item.id) ? "Dans panier" : "Ajouter"}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>

                        {/* Panier */}
                        <View style={{ backgroundColor: '#FFFFFF', padding: 10, borderRadius: 8, marginBottom: 60 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#6A42F4', textAlign: 'center' }}>
                                Votre panier
                            </Text>

                            {cart.length === 0 ? (
                                <Text style={{ textAlign: 'center', fontStyle: 'italic', padding: 20 }}>
                                    Panier vide
                                </Text>
                            ) : (
                                <>
                                    {cart.map(item => (
                                        <View
                                            key={item.id}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 8,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#e0e0e0'
                                            }}
                                        >
                                            <Text numberOfLines={1} style={{ flex: 1 }}>
                                                {item.name}
                                            </Text>
                                            <Text style={{ fontWeight: 'bold', color: '#6A42F4', marginHorizontal: 10 }}>
                                                {item.prix} €
                                            </Text>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    padding: 8,
                                                    borderRadius: 5
                                                }}
                                                onPress={() => removeFromCart(item.id)}
                                            >
                                                <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}

                                    {/* Total */}
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6A42F4', textAlign: 'center' }}>
                                            Total: {total.toFixed(2)} €
                                        </Text>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#6A42F4',
                                                padding: 15,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                marginTop: 15,
                                                marginBottom: 10
                                            }}
                                            onPress={handlePurchase}
                                        >
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                                                ACHETER MAINTENANT
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </ThemedView>
    );
}