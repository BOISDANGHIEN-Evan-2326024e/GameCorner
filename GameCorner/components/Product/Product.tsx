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
                    <ThemedText style={styles.collapsibleContent}>{product.desc}</ThemedText>
                </Collapsible>

                <TouchableOpacity
                    style={[styles.buyButton, isSold && styles.soldButton]}
                    disabled={isSold}
                    onPress={openBuyModal}
                >
                    <Text style={styles.buyButtonText}>{isSold ? "Vendu" : "Acheter"}</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal Acheter avec panier et réductions - Responsive */}
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

                        <View style={[styles.contentContainer, { flexDirection: isLargeScreen ? 'row' : 'column' }]}>
                            {/* Liste des produits du vendeur */}
                            <View style={[styles.productsListContainer, {
                                borderRightWidth: isLargeScreen ? 1 : 0,
                                borderBottomWidth: isLargeScreen ? 0 : 1,
                                paddingRight: isLargeScreen ? 15 : 0,
                                paddingBottom: isLargeScreen ? 0 : 15,
                            }]}>
                                <Text style={styles.modalTitle}>Autres jeux du vendeur</Text>
                                <FlatList
                                    data={[product, ...otherProducts]}
                                    keyExtractor={(prod) => prod.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.productItem}>
                                            <Image
                                                source={{ uri: item.photo[0] }}
                                                style={styles.productImage}
                                            />
                                            <View style={styles.productDetails}>
                                                <Text style={styles.productName}>{item.name}</Text>
                                                <Text style={styles.productPrice}>{item.prix} €</Text>
                                                <Text numberOfLines={2} style={styles.productDescription}>{item.desc}</Text>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.addButton,
                                                        (item.vendu || cart.some(p => p.id === item.id)) && styles.disabledButton
                                                    ]}
                                                    onPress={() => !item.vendu && !cart.some(p => p.id === item.id) && addToCart(item)}
                                                    disabled={item.vendu || cart.some(p => p.id === item.id)}
                                                >
                                                    <Text style={styles.addButtonText}>
                                                        {item.vendu ? "Produit vendu" : cart.some(p => p.id === item.id) ? "Déjà dans le panier" : "Ajouter au panier"}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>

                            {/* Panier */}
                            <View style={[styles.cartContainer, {
                                paddingLeft: isLargeScreen ? 15 : 0,
                                paddingTop: isLargeScreen ? 0 : 15,
                            }]}>
                                <Text style={styles.cartTitle}>Votre panier</Text>

                                {cart.length === 0 ? (
                                    <Text style={styles.emptyCartText}>Votre panier est vide</Text>
                                ) : (
                                    <>
                                        <FlatList
                                            data={cart}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={({ item }) => (
                                                <View style={styles.cartItem}>
                                                    <Text style={styles.cartItemName}>{item.name}</Text>
                                                    <Text style={styles.cartItemPrice}>{item.prix} €</Text>
                                                    <TouchableOpacity
                                                        style={styles.removeButton}
                                                        onPress={() => removeFromCart(item.id)}
                                                    >
                                                        <Text style={styles.removeButtonText}>Retirer</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />

                                        <View style={styles.cartSummary}>
                                            <Text style={styles.subtotalText}>Sous-total: {subtotal.toFixed(2)} €</Text>

                                            {discount > 0 && (
                                                <View style={styles.discountContainer}>
                                                    <Text style={[styles.discountText, { color }]}>
                                                        Réduction ({discount}%): -{discountAmount.toFixed(2)} €
                                                    </Text>
                                                    <Text style={[styles.discountInfoText, { color }]}>
                                                        {discount === 10
                                                            ? "Économisez 10% pour l'achat de 2 jeux !"
                                                            : "Économisez 20% pour l'achat de 3 jeux ou plus !"}
                                                    </Text>
                                                </View>
                                            )}

                                            <Text style={styles.totalText}>Total: {total.toFixed(2)} €</Text>

                                            <TouchableOpacity
                                                style={styles.checkoutButton}
                                                onPress={handlePurchase}
                                            >
                                                <Text style={styles.checkoutButtonText}>Finaliser l'achat</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeBuyModal}
                        >
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ThemedView>
    );
}