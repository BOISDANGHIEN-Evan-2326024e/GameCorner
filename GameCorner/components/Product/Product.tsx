import React, {useEffect, useState} from 'react';
import { Image, Button, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import styles from '../../assets/styles/item.styles';
import data from '../../assets/json/data.json';
import {User} from "@/Class/User";



export default function Product({ productId, setPage }: { setPage: (page: string) => void, productId: Number }) {

    const product = data.produits.find(p => p.id === productId);
    const marchandUser = data.users.find(user => user.id === product?.marchand);

    if (!product) {
        return (
            <ThemedView>
                <ThemedText>Produit non trouvé</ThemedText>
            </ThemedView>
        );
    }

    const [isSold, setIsSold] = useState(product.vendu);
    const vendProduit = () => {
        setIsSold(true); // Marquer le produit comme vendu
    };
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <ScrollView horizontal>
                    {product.photo.map((imageUrl, index) => (
                        <Image
                            key={index}
                            source={{ uri: imageUrl }}
                            style={{ width: 400, height: 400, marginRight: 10 }}
                        />
                    ))}
                </ScrollView>
            }>
            <ThemedView style={styles.titleContainer}>
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
                disabled={isSold} // Désactive le bouton si le produit est vendu
                onPress={vendProduit}
            />
        </ParallaxScrollView>
    );
}