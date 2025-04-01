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
    setProduits: (produits: any[]) => void;
    categories: any[];
    users: any[];
}

export default function Product({ productId, setPage, produits, setProduits, categories, users }: RechercheProps) {
    console.log("ProductId", productId);
    console.log("Produits", produits);
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
    const [otherProducts, setOtherProducts] = useState(
        produits.filter(p => p.marchand === product.marchand && p.id !== product.id)
    );
    const [cart, setCart] = useState<any[]>([]); // Liste des produits dans le panier

    const openBuyModal = () => {
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

    // Calcul de la réduction en fonction du nombre de jeux achetés
    const getDiscount = () => {
        const numItems = cart.length;
        if (numItems === 2) {
            return { discount: 10, color: 'green' };
        } else if (numItems >= 3) {
            return { discount: 20, color: 'blue' };
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

            <Button
                title={isSold ? "Vendu" : "Acheter"}
                disabled={isSold}
                onPress={openBuyModal}
            />

            {/* Modal Acheter avec panier et réductions */}
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

                        <View style={styles.contentContainer}>
                            {/* Liste des produits du vendeur (partie gauche) */}
                            <View style={styles.productsListContainer}>
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
                                                <Text style={styles.productDescription}>{item.desc}</Text>
                                                <TouchableOpacity
                                                    style={[
                                                        styles.addButton,
                                                        // Désactiver le bouton si le produit est déjà vendu
                                                        item.vendu && styles.disabledButton
                                                    ]}
                                                    onPress={() => !item.vendu && addToCart(item)}
                                                    disabled={item.vendu}
                                                >
                                                    <Text style={styles.addButtonText}>
                                                        {item.vendu ? "Produit vendu" : "Ajouter au panier"}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>

                            {/* Panier (partie droite) */}
                            <View style={styles.cartContainer}>
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
        width: '90%',
        maxWidth: 800,
        maxHeight: '90%',
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
    contentContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    productsListContainer: {
        flex: 3,
        marginRight: 10,
        maxHeight: 500,
    },
    cartContainer: {
        flex: 2,
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 8,
        maxHeight: 500,
    },
    cartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    emptyCartText: {
        fontStyle: 'italic',
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    productItem: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 4,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2a86db',
        marginTop: 4,
    },
    productDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    addButton: {
        backgroundColor: '#2a86db',
        padding: 8,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cartItemName: {
        flex: 2,
        fontSize: 14,
    },
    cartItemPrice: {
        flex: 1,
        fontSize: 14,
        textAlign: 'right',
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        padding: 6,
        borderRadius: 4,
        marginLeft: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    cartSummary: {
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        paddingTop: 15,
    },
    subtotalText: {
        fontSize: 16,
        marginBottom: 8,
    },
    discountContainer: {
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 4,
        marginBottom: 8,
    },
    discountText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    discountInfoText: {
        fontSize: 14,
        marginTop: 4,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#ccc',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 20,
    },
    closeButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});