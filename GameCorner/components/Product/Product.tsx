import React from 'react';
import { Image, Button, ScrollView } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import styles from '../../assets/styles/item.styles';
import data from '../../assets/json/data.json';
import uri from "ajv/lib/runtime/uri";

export default function Product() {
    // Simulation avec le produit ID 101
    const product = data.produits.find(p => p.id === 101);

    if (!product) {
        return (
            <ThemedView>
                <ThemedText>Produit non trouvé</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">{product.name}</ThemedText>
                <ThemedText type="title">{product.prix} €</ThemedText>
            </ThemedView>

            {/* Carousel d'images */}
            <ScrollView horizontal>
                {product.photo.map((imageUrl, index) => (
                    <Image
                        key={index}
                        source={{ uri: imageUrl }}
                        style={{ width: 200, height: 200, marginRight: 10 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            <ThemedText>{product.desc}</ThemedText>

            <Collapsible title="Description">
                <ThemedText>{product.desc}</ThemedText>
            </Collapsible>

            <Collapsible title="État">
                <ThemedText>{product.etat}</ThemedText>
            </Collapsible>

            <Collapsible title="Marque">
                <ThemedText>Nintendo (pour The Legend of Zelda)</ThemedText>

            </Collapsible>
            <Collapsible title="Images">
                <Image>
                    source={{uri:"https://example.com/images/zelda1.jpg"}};
                </Image>
            </Collapsible>
            <Collapsible title="Couleur">
                <ThemedText>Les couleurs du jeu varient (monde ouvert)</ThemedText>
            </Collapsible>

            <Collapsible title="Nombres de membres intéressés">
                <ThemedText>5 membres sont intéressés par votre article</ThemedText>
            </Collapsible>

            <Button
                title="Acheter"
                disabled={product.vendu}
                onPress={() => {
                    // Logique d'achat à implémenter
                    console.log(`Achat du produit ${product.name}`);
                }}
            />
        </ParallaxScrollView>
    );
}