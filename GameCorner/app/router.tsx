import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import data from "../assets/json/data.json";
import Recherche from './recherche';
import ProfilScreen from './profil';
import Test from './test';
import Accueil from './(tabs)/accueil';
import CustomBottomBar from './bottomBar';
import Product from "@/components/Product/Product";

export default function Router({ IdUser }: { IdUser: number }) {
    const [users, setUser] = useState(data?.users || []);  // Utiliser un tableau vide par défaut
    const [produits, setProduits] = useState(data?.produits || []);  // Utiliser un tableau vide par défaut
    const [relations, setRelations] = useState(data?.relations || []);  // Utiliser un tableau vide par défaut
    const [categories, setCategories] = useState(data?.categories || []);  // Utiliser un tableau vide par défaut
    const [favoris, setFavoris] = useState(data?.favoris || []);  // Utiliser un tableau vide par défaut
    const User = users.find((u: { id: number }) => u.id === IdUser) || null;  // Assurer que user est un tableau
    const [page, setPage] = useState('recherche');
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {page === 'recherche' && <Recherche setPage={setPage} produits={produits} relations={relations} />}
                {page === 'user' && <ProfilScreen setPage={setPage} UserData={User} />}
                {page === 'accueil' && <Accueil setPage={setPage} setSelectedProductId={setSelectedProductId} />}
                {page === 'test' && <Test setPage={setPage} />}
                {page === 'produit' && <Product productId={selectedProductId || 0} setPage={setPage} produits={produits} categories={categories} users={users} />}
            </View>

            <CustomBottomBar page={page} setPage={setPage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    }
});
